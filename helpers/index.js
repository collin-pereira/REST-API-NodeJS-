/**
 * 
 * @param {model} model 
 * @param {string} id 
 * 
 * check if requested resource exists in the database
 */
const resourceExists = async(model, id)=>{
    try{
        console.log('resource')
        const count = await model.count({where:{id:id}})
        return count===1
    }catch(error){
        throw new Error(error)
    }
}

module.exports = {
    resourceExists
}