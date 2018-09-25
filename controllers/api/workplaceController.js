const Box = require('../../models/Box');
const Item = require('../../models/Item');

module.exports = {
  async getAllBoxs(req, res, next){
    let boxs = await Box.find({});
    return res.status(200).json(boxs);
  },

  getUserBoxList(req, res, next){
      Box.find({created_by: req.params.user_id}).then(boxs => {
        return res.status(200).json(boxs);
      }).catch(err => {
        return res.status(404).json({err});
      })
  },

  //should i use this instead of getUserBoxList() to show all boxs and items?
  async getWholeBox(req, res, next){
    let boxs = await Box.find({created_by: req.params.user_id});
    if(boxs){
      let user_boxs = [];
      // await boxs.map(async box => {
      //   let box_child = {};
      //   let item = await Item.find({parent: box._id}, 'name');
      //   box_child.box = box;
      //   box_child.items = [...item];
      //   user_boxs.push(box_child);
      // });

      for(let box of boxs){
        let box_child = {};
        let item = await Item.find({parent: box._id}, 'name');
        box_child.box = box;
        box_child.items = [...item];
        user_boxs.push(box_child);
      }

      // await Promise.all(boxPromise);
      return res.status(200).json(user_boxs);
    }
  },

  createBoxList(req, res, next){
    const newBox = new Box({
      name: req.body.name,
      created_by: req.body.user_id,
      community: req.body.community
    });
    newBox.save().then(box => {
      return res.status(200).json({box});
    }).catch(err => {
      return res.status(404).json({err});
    })
  },

  async updateBoxList(req, res, next){
    let box;
    try{
      box = await Box.findById(req.params.box_id);
    }
    catch(err){
      return res.status(404).json(err);
    }
    if(box){
      box.name = req.body.name;
      box.updated_at = Date.now();
      await box.save();
      return res.status(200).json(box);
    }
    else{
      return res.status(404).json({
        message: 'Not Found'
      })
    }
  },

  async getItemList(req, res, next){
    let items;
    try{
      items = await Item.find({});
    }
    catch(err){
      return res.status(404).json({err});
    }
    return res.status(200).json({items});
  },

  async getUserBoxItems(req, res, next){
    let items;
    try{
      items = await Item.find({parent: req.params.box_id});
    }
    catch(err){
      return res.status(404).json(err);
    }
    if(items){
      return res.status(200).json(items)
    }
    else{
      return res.status(404).json({
        message: 'not found',
        items
      })
    }
  },

  async createItem(req, res, next){
    let newItem = new Item({
      name: req.body.name,
      parent: req.body.parent,
      created_by: req.body.user_id
    });
    try{
      await newItem.save();
    } catch(err){
      return res.status(404).json({err});
    }
    return res.status(200).json(newItem);
  },

  async updateItem(req, res, next){
    let item;
    try{
      item = await Item.findById(req.params.item_id);
    }
    catch(err){
      return res.status(404).json(err);
    }

    if(item){
      item.name = req.body.name;
      item.description = req.body.description;
      item.updated_at = Date.now();
      item.parent = req.body.parent;
      item.deadline = req.body.deadline;
      try{
        await item.save();
      }
      catch(err){
        return res.status(404).json(err);
      }
      return res.status(200).json(item);
    }
    else {
      return res.status(404).json({
        message: 'Not Found',
        success: false
      })
    }
  },

  async deleteItem(req, res, next){
    let item;
    try{
      item = await Item.findById(req.params.item_id);
    }
    catch(err){
      return res.status(404).json(err);
    }

    if(item){
      await item.remove();
      return res.status(200).json(item);
    }
    else{
      return res.status(404).json({
        message: 'Not found',
        success: false
      })
    }
  },

  async deleteUserBox(req, res, next){
      let delBox;
      try{
        delBox = await Box.findById(req.params.boxId);
      }
      catch(err){
        return res.status(404).json({err});
      }

      if(!delBox){
        return res.status(404).json({
          message: 'Not Found'
        })
      }
      else{
        delBox.remove().then(box => {
          return res.status(200).json({
            message: 'success',
            box
          })
        }).catch(err => {
          return res.status(404).json({err});
        })
      }
  }
}
