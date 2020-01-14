const Dev = require('../models/Dev');
const axios = require('axios');

const parseStringAsArray = require('../../utils/parseStringAsArray');

module.exports = {
  async store(req, res){
    const { github_username, techs, latitude, longitude } = req.body;

    const devExists = await Dev.findOne({ github_username });

    if(devExists) {
      return res.status(404).json({error: 'User already exists'})
    }

    const response = await axios.get(`https://api.github.com/users/${github_username}`);

    const { name = login, avatar_url, bio } = response.data;

    const techList = parseStringAsArray(techs);

    const location = {
      type: 'Point',
      coordinates: [longitude, latitude],
    };

    const dev = await Dev.create({
      github_username,
      name,
      avatar_url,
      bio,
      techs: techList,
      location
    })
    
    return res.json(dev)
  },

  async index(req, res) {
    const devs = await Dev.find();

    return res.json(devs);
  }
}