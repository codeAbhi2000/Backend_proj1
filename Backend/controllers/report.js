const Expense = require('../models/expense')

require('dotenv').config();

// const AWS = require('aws-sdk')


// const uploadToS3 = async (data, fileName) => {
//     // console.log(data);
//     const blob = new Blob([data], { type: 'application/pdf' });
//     const buffer = await blob.arrayBuffer();
//     const bufferData = Buffer.from(buffer);

//     AWS.config.update({
//         accessKeyId: process.env.AWS_S3_ACCESS_KEY,
//         secretAccessKey: process.env.AWS_S3_ACCESS_SECRET_KEY,
//     });

//     const s3 = new AWS.S3()
//     const params = {
//         Bucket: 'abhshekexpenseapp',
//         Key: fileName,
//         Body: bufferData,
//         ContentType: 'application/pdf',
//         ACL: 'public-read',
//     };

//     return new Promise(async (resolve, reject) => {
//         s3.upload(params, (err, data) => {
//             if (err)
//             {
//                 console.error('S3 upload error', err);
//                 reject(err)
//             } else
//             {
//                 //   console.log('File uploaded to S3:', data.Location);
//                 resolve(data.Location)
//                 // You can access the S3 URL in the data.Location property
//             }
//         });

//     })
// }

exports.postGetMonthReport = async (req, res, next) => {
    const { month, uid } = req.body
    try
    {
        const data = await Expense.getMonthReport(month, uid)
        //  console.log(data);
        res.json({
            data: data
        })
    } catch (error)
    {
        res.json({
            msg: 'something went wrong'
        })
    }

}

exports.postGetYearReport = async (req, res, next) => {
    const { year, uid } = req.body
    try
    {
        const data = await Expense.getYearReport(year, uid)
        // console.log(data);
        res.json({
            data: data
        })
    } catch (error)
    {
        res.json({
            msg: 'something went wrong'
        })
    }

}

// exports.postGetReportGivenRange = async (req, res, next) => {
//     const { start_date, end_date, uid } = req.body
//     try
//     {
//         const data = await Expense.getReportGivenRange(start_date, end_date, uid)
//         //  console.log(data);
//         res.json({
//             data: data
//         })
//     } catch (error)
//     {
//         res.json({
//             msg: 'something went wrong'
//         })
//     }
// }

// exports.postDownloadReport = async (req, res) => {
//     const { uid } = req.body
//     // console.log('Request Body:', req.body);
//     // console.log('Request Headers:', req.headers);
//     const formData = req.files.pdfFile
//     // console.log(req.files);
//     // console.log(uid);
//     // const formData = req.files.pdfFile
//     //  console.log(formData.data);
//     const fileName = `expenseReport${uid}/${new Date().getTime()}.pdf`
//     try
//     {
//         const fileUrl = await uploadToS3(formData.data, fileName)
//         // console.log(fileUrl);
//         const downlod = new Downloads(uid, fileUrl)
//         await downlod.save()
//         res.status(200).json({ fileUrl, msg: "successfully downloaded report" })
//     } catch (error)
//     {
//         console.log(error);
//         res.status(500).json({
//             msg: 'Something Went wrong'
//         })
//     }
// }

// exports.getDownloadList = async (req, res) => {
//     const uid = req.params.uid
//     try
//     {

//         const list = await Downloads.getAllDownloads(uid)
//         if (list)
//         {
//             res.json({
//                 data: list[0]
//             })
//         }
//         // console.log(list);
//     } catch (error)
//     {
//         console.log(error);
//         res.status(500).json({
//             msg: 'something went Wrong'
//         })
//     }
// }