const ThemeModel = require('../models/theme');

let userTheme = null;
let userColors = [];

const GetThemes = async (req, res) => {
  try {
    const themes = await ThemeModel.find({}, 'themeName');
    res.status(200).json({ themes });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching themes', error });
  }
};

const SetUserTheme = async (req, res) => {
  const { themeName } = req.body; 

  try {
    const selectedTheme = await ThemeModel.findOne({ themeName });

    if (!selectedTheme) {
      return res.status(404).json({ message: 'Theme not found' });
    }

    userTheme = selectedTheme.themeName;
    userColors = selectedTheme.colors;

    res.status(200).json({
      message: 'Theme selected successfully',
      userTheme,
      userColors
    });
  } catch (error) {
    res.status(500).json({ message: 'Error setting user theme', error });
  }
};

module.exports = {
  GetThemes,
  SetUserTheme
};
