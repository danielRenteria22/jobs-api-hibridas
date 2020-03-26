module.exports = {
    getAllJobs,
    getOneJob,
    createJob,
    updateJob,
    deleteJob,
    getJobsByPage,
    uploadProfilePhoto
}

const JobsSub = require('../models/Jobs')

function getAllJobs(req, res){
    JobsSub.find({}, (err, concepts)=>{
        if(err) return res.status(500).send({message: `Problem with the searching request ${err}`})
        if(!concepts) return res.status(404).send({message: `Jobs does not exists`})

        res.status(200).send({message: 'Request successful', jobs: concepts})
    })
}

function getJobsByPage(req, res){
    const perPage = parseInt(req.body.perPage)
    const page = parseInt(req.body.page)
    let jobConcepts = null;

    let searchData = req.query.search
    let query = {}

    if(searchData){
        query.$or = [
            {category: {$regex: new RegExp(searchData), $options: 'i'}},
            {address: {$regex: new RegExp(searchData), $options: 'i'}},
        ]
    }

    JobsSub.find(query).skip((page-1)* perPage).limit(perPage).sort({
        publishDate: -1
    }).exec().then((concepts)=>{
        
    })
}

function getOneJob(req, res){
    let  jobID = req.body._id
    JobsSub.findById(jobID, (err, concept)=>{
        if(err) return res.status(500).send({message: `Problem with the searching request ${err}`})
        if(!concept) return res.status(404).send({message: `Job not exist`})

        res.status(200).send({message: 'Request successful', job: concept})
    })
}

function createJob(req, res){
    let job = new JobsSub(req.body)

    job.save((err, jobStored)=>{
        if(err) return res.status(400).send({message: `Error on model ${err}`})

        res.status(200).send({job: jobStored})
    })
}

function updateJob(req, res){
     let jobid = req.body.jobid
     let update = req.body.job
     JobsSub.findByIdAndUpdate({_id: jobid}, update, 
        (err, concept)=>{
        if (err) return res.status(500).send({ message: `Error in the request ${err}` })
        res.status(201).send({message:'Job is updated', job: concept})
     })
}

function deleteJob(req, res){
    let jobID = req.body._id

    JobsSub.remove({_id: jobID}, (err, concept)=>{
        if (err) return res.status(500).send({ message: `Error in the request ${err}` })
        res.status(200).send({message: `Remove Completed`})
    })
}

function uploadProfilePhoto(req, res){

}