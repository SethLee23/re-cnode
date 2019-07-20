let host = 'https://cnodejs.org/api/v1'
let url = {
  topics: '/topics',
  article: '/topic/',
  userInfo: '/user/',
  collect: '/topic_collect/'
}
for(let key in url){
    if (url.hasOwnProperty(key)) {
        url[key] = host + url[key]
      }
}
export default url