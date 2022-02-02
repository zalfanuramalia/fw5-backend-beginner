const historyModel = require('../models/history');

const postHistory = (req, res) => {
    const data2 = {
        id: res.length + 1,
        merk: req.body.merk,
        return: req.body.return,
        prepayment: req.body.prepayment,
        new_arrival: req.body.new_arrival,
        popularity: req.body.popularity
    };
    historyModel.postHistory(data2, (result) =>{
        console.log(result);
        if (result.affectedRows == 1){
            return res.send({
                success: true,
                message: 'History Posted',
                result: req.body
            });
        } else {
            return res.status(404).send({
                success: false,
                message: 'There is no history'
            });
        }
    }); 
};

const delHistory = (req, res) => {
    const {id} = req.params;
    const process = (result) => {
        if (result.affectedRows == 1){
            const ress = (result) =>{
                if(result.length > 0){
                    return res.status(500).send({
                        success: false,
                        message : 'Data History failed to Delete'
                    });
                    
                } else {
                    return res.send({
                        success: true,
                        message : 'History Delete'
                    });
                    
                }
            };
            historyModel.delHistory(id, ress);
        } else {
            return res.status(404).send({
                success: false,
                message: 'Data History not Found'
            });
        }
    };
    historyModel.delHistory(id, process);
};

const patchHistory = (req, res)=>{
    const {id} =req.params;
    const data = {
        id: res.length + 1,
        merk: req.body.merk,
        return: req.body.return,
        prepayment: req.body.prepayment,
        new_arrival: req.body.new_arrival,
        popularity: req.body.popularity
    };
    const ress = (result) =>{
        if (result.affectedRows == 1){
            return res.send({
                success: true,
                message: 'Data History Updated',
            });
        } else {
            return res.status(404).send({
                success: false,
                message: 'Data History not Found'
            });
        }
        
    };
    historyModel.patchHistory(data, id, ress);  
};

const dataHistory = (req, res) => {
    historyModel.dataHistory((result) => {
        if (result.length> 0){
            return res.send({
                success: true,
                message: 'Data History',
                result
            });
        } else {
            return res.status(404).send({
                success: false,
                message: 'There is no History'
            });
        }
    });
};



module.exports = {postHistory, delHistory, patchHistory, dataHistory};