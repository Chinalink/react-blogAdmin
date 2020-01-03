/*
 * @Description: 
 * @Author: HuXiaoDai
 * @Date: 2020-01-02 16:12:06
 * @LastEditTime : 2020-01-02 16:13:48
 */
const { override, fixBabelImports } = require('customize-cra');

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: 'css'
  })
)