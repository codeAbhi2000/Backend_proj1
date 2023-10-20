import { Box, FormControl, Stack, TextField, Button, MenuItem, Select, Typography ,Backdrop} from '@mui/material'
import React, { useState, useRef } from 'react'
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/userContext';
import DownloadIcon from '@mui/icons-material/Download';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Axios from 'axios'
import YearReport from './YearReport';
import MonthReport from './MonthReport';
import GivenRangeReport from './GivenRangeReport';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas'
import GridLoader from "react-spinners/GridLoader";

function Report() {
    const date = new Date()
    const user = useContext(UserContext)
    const contentRef = useRef(null);

    const navigate = useNavigate()
    const [Looder, setLooder] = useState({
        load: false,
        open: false
    })
    const [ViewRepo, setViewRepo] = useState(false)

    const [MonthData, setMonthData] = useState({
        allExpenses: [],
        total_expense: null,
        savings_budget: null,
        cat_distribution: []
    })

    const [GivenRangeData, setGivenRangeData] = useState({
        allExpenses: [],
        total_expense: null,
        savings_budget: null,
        cat_distribution: []
    })

    const [YearData, setYearData] = useState({
        month_expense: [],
        bud_save_in: [],
        overAll_data: [],
        cata_wise_data: []
    })


    const comeBack = () => {
        setViewRepo(false)
        setYearData({
            month_expense: [],
            bud_save_in: [],
            overAll_data: [],
            cata_wise_data: []
        })
        setMonthData({
            allExpenses: [],
            total_expense: null,
            savings_budget: null,

            cat_distribution: []
        })
        setGivenRangeData({
            allExpenses: [],
            total_expense: null,
            savings_budget: null,
            cat_distribution: []
        })
    }

    const [Range, setRange] = useState({
        type: null,
        start_date: '',
        end_date: ''
    })

    const generateReport = () => {
        setLooder({
            load:true,
            open:true
        })
        const input = contentRef.current;
        const options = {
            backgroundColor: '#c1d113'
        };
        html2canvas(input, options).then(async (canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4', true);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const imgWidth = canvas.width;
            const imgHeight = canvas.height;
            const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
            const imx = (pdfWidth - imgWidth * ratio);
            const imy = 40;
            pdf.addImage(imgData, 'PNG', imx, imy, imgWidth * ratio, imgHeight * ratio);

            // Convert the PDF content to a Uint8Array
            const pdfContent = pdf.output('arraybuffer');

            // Create a Blob from the Uint8Array
            const pdfBlob = new Blob([pdfContent], { type: 'application/pdf' });

            // Create a File from the Blob
            const pdfFile = new File([pdfBlob], 'expense_report.pdf', { type: 'application/pdf' });

            const formData = new FormData();
            formData.append('pdfFile', pdfFile);
            formData.append('uid', user.user.id);

            // Check if this contains the PDF file and user ID
            // console.log(formData.get('pdfFile'));
            // console.log(formData.get('uid'));

            // //console.log(formData);
            // console.log(Object.fromEntries(formData.entries()))
            try
            {

                const res = await Axios.post('http://3.109.94.251:5000/downloadReport',
                    formData,
                    {
                        headers: {
                            Authorization: localStorage.getItem('token'),
                            " Content-Type ": 'multipart/form-data',
                        },
                    })
                console.log(res);
                if (res.status === 200)
                {
                    let a = document.createElement('a')
                    a.href = res.data.fileUrl;
                    // a.download()
                    a.click()
                }
            } catch (error)
            {
                console.log(error);
            }
        })
        setLooder({
            load:false,
            open:false
        })
    };

    const handleChange = (e) => {
        setRange({ ...Range, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setViewRepo(true)
        if (Range.type === 'this_month')
        {
            // console.log(`get ${date.getMonth() + 1} Month Report`);
            Axios.post('http://3.109.94.251:5000/getMonthReport', {
                month: date.getMonth() + 1,
                uid: user.user.id
            },
                {
                    headers: {
                        Authorization: localStorage.getItem('token')
                    }
                }).then(res => {
                    // console.log(res);
                    setMonthData({
                        allExpenses: res.data.data[2],
                        total_expense: res.data.data[0],
                        savings_budget: res.data.data[1],
                        cat_distribution: res.data.data[3]
                    })
                }).catch(err => console.log(err))
        }
        else if (Range.type === 'this_year')
        {
            // console.log(`get ${date.getFullYear()} year  Report`);
            Axios.post('http://3.109.94.251:5000/getYearReport', {
                year: date.getFullYear(),
                uid: user.user.id
            },
                {
                    headers: {
                        Authorization: localStorage.getItem('token')
                    }
                }).then(res => {
                    // console.log(res.data.data);
                    setYearData({
                        month_expense: res.data.data[0],
                        bud_save_in: res.data.data[1],
                        overAll_data: res.data.data[2],
                        cata_wise_data: res.data.data[3]
                    })
                    console.log(YearData);
                }).catch(err => console.log(err))
        }
        else
        {
            // console.log(`get report in range of ${Range.start_date} to ${Range.end_date}`);
            if (Range.end_date < Range.start_date)
            {
                alert('End date must be greater than start date')
                setRange({
                    type: null,
                    start_date: '',
                    end_date: ''
                })
            } else
            {
                Axios.post('http://3.109.94.251:5000/getReportGivenRange', {
                    start_date: Range.start_date,
                    end_date: Range.end_date,
                    uid: user.user.id
                },
                    {
                        headers: {
                            Authorization: localStorage.getItem('token')
                        }
                    })
                    .then(res => {
                        // console.log(res);
                        setGivenRangeData({
                            allExpenses: res.data.data[0],
                            total_expense: res.data.data[1],
                            savings_budget: res.data.data[2],
                            cat_distribution: res.data.data[3]
                        })
                    }).catch(err => console.log(err))
            }
        }
    }
    // console.log(Range.type);
    if (user.user.isPremiumUser)
    {
        return (
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid'
            }} width={'100%'} >
                {!ViewRepo ? <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: 2,
                    mt: 2
                }} width={{ sm: '80%', xs: '90%' }} >
                    <FormControl sx={{
                        width: { sm: '80%', xs: '90%' },
                        mt: 2,
                    }}>
                        <form onSubmit={handleSubmit}>
                            <Stack spacing={2}>
                                <label htmlFor="demo-simple-select">Select how you want to get Report</label>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label='category'
                                    name='type'
                                    value={Range.type}
                                    onChange={handleChange}
                                >
                                    <MenuItem value={'this_month'}>This Month</MenuItem>
                                    <MenuItem value={'this_year'}>This Year</MenuItem>
                                    <MenuItem value={'custom'}>Custom Date</MenuItem>
                                </Select>
                                <Box sx={{
                                    display: Range.type === 'custom' ? 'flex' : 'none',
                                    border: '2px solid ',
                                    borderColor: 'secondary.main',
                                    justifyContent: 'space-evenly',
                                    alignItems: 'center',
                                    borderRadius: 3,
                                    p: 2
                                }}>
                                    <Stack direction={{ sm: 'row', xs: 'column' }} spacing={{ sm: 2, xs: 3 }}>
                                        <label htmlFor="date">Start Date</label>
                                        <TextField variant='outlined' value={Range.start_date} type="date" name='start_date' color='secondary' onChange={handleChange} />
                                        <label htmlFor="date"> End Date</label>
                                        <TextField variant='outlined' value={Range.end_date} type="date" name='end_date' color='secondary' onChange={handleChange} />
                                    </Stack>
                                </Box>
                                <Button variant='contained' sx={{ bgcolor: 'secondary.main' }} type='submit'>Get Report</Button>
                            </Stack>
                        </form>
                    </FormControl>
                </Box> : <></>}
                {ViewRepo ? <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: 2
                }} width={'90%'} ref={contentRef} >
                    <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        open={Looder.open}>
                        <GridLoader loading={Looder.load} color="#7a5af5" />
                    </Backdrop>
                    <Typography variant='h4' textAlign={'center'} mb={3}>Your Expense Report</Typography>
                    {YearData.month_expense.length !== 0 ? <YearReport data={YearData} /> : <></>}
                    {MonthData.allExpenses.length !== 0 ? <MonthReport data={MonthData} /> : <></>}
                    {GivenRangeData.allExpenses.length !== 0 ? <GivenRangeReport data={GivenRangeData} /> : <></>}
                    <Stack direction={'row'} spacing={3}>
                        <Button startIcon={<ArrowBackIcon />} variant='outlined' color='secondary' onClick={comeBack}>Back</Button>
                        <Button startIcon={<DownloadIcon />} variant='contained' color='secondary' onClick={generateReport}>Download Report</Button>
                    </Stack>
                </Box> : <></>}
            </Box>
        )
    }
    else
    {
        // console.log(user.user.isPremiumUser);
        navigate('/userDash/notice')
        return null
    }
}

export default Report