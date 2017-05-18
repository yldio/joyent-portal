const fs = require('fs');
const path = require('path');

// TODO: this will need to happen for prod and test too
const configPath = path.join(__dirname, '../node_modules/react-scripts/config/webpack.config.dev.js');
const orignalConfigPath = path.join(__dirname, '../node_modules/react-scripts/config/webpack.config.dev.original.js');
const enhancedConfigPath = path.join(__dirname, './webpack.config.dev.js');

// bit of healthy callback hell for making it spicy
fs.readFile(configPath, (error, orignalConfig) => {
  if(error) {
    console.log('Original config read error', error);
  }
  else {
    fs.writeFile(orignalConfigPath, orignalConfig, (error) => {
      if(error) {
        console.log('Original config write error', error);
      }
      else {
        fs.readFile(enhancedConfigPath, (error, enhancedConfig) => {
          if(error) {
            console.log('Enhanced config read error', error);
          }
          else {
            fs.writeFile(configPath, enhancedConfig, (error) => {
              if(error) {
                console.log('Enhanced config write error', error);
              }
            })
          }
        })
      }
    })
  }
})
