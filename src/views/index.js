let files = require.context("./", true, /index.vue$/)
let views = {};
files.keys().forEach(filePath => {
        let  key = filePath.match(/.*\/(.*)\/index.vue$/)[1];
        views[key] = files(filePath).default
})

export default views;

// import Category from './category';
// import  Home from './home';
// import  Profile from './profile';
// import  Login from './login';
// import  List from './list';
// import  Cart from './cart';
//
// export default {
//         Category,
//         Profile,
//         Home,
//         Login,
//         List,
//         Cart
// }