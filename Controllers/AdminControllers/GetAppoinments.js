const { parse } = require('dotenv');
const Appoinment  = require('../../Schema/Appoinments')



exports.getAllAppoinments = async  (req,res )=>{
    const doctorId = req.rootDoctor._id;
    console.log(doctorId);
    console.log(req.query.date)
   // const created_at={date,month,year};
    const obj = await Appoinment.findOne({doctorId ,created_at:req.query.date});
    console.log(obj.Appoinments)
    res.send(obj.Appoinments)

  
}