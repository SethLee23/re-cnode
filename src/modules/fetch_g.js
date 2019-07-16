import axios from 'axios'

function fetch_g(url, data) {
  return new Promise((resolve, reject) => {
    axios.get(url, data).then(res => {
      if (res.status >= 200 && res.status < 300) {
        resolve(res)
        
      } else {
        location.href = 'login.html'
      }
    })
    .catch(err => reject(err))
  })
}
 export default fetch_g