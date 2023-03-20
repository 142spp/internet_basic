const express = require('express')
const app = express()
const port = 3000

app.use(express.static('public'))


app.get('/accident', function(req,res){     //사건사고 리스트를 리스폰스 하는 함수
  var request = require('request');
  var url = 'http://apis.data.go.kr/1262000/AccidentService/getAccidentList?serviceKey=oSpmuM2I99ZnPwQ9BQuULuqd35IWPToPfu3qwsTMmsto3AW0OufAdW0ADGvDfjeQFNiixaWqBZkNCSHs28cM4A%3D%3D&numOfRows=1&pageNo=1';

  var countryEnName=req.query.countryEnName    //사용자가 입력한 영문 국가명 불러옴

  url = url + "&countryEnName=" + countryEnName;
  console.log(url)

  var options = {
    'method': 'GET',
    'url': url,
    'headers': {
    }
  };
  request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log(response.body);
    res.send(response.body);     //본문으로 리스폰스를 전달
  });
})


app.get('/video',function(req,res){    //사건사고와 관련된 비디오를 불러오는 함수
  var request=require('request');
  var q=req.query.q;    //키워드를 영문국가명+accident으로 정함

  var optionParams={   //목록을 만들고 이를 차례대로 url에 결합시킴
    q:q,
    part:"snippet",
    key:"AIzaSyBKnPiLXmhKhH5H9AIDwE_rx0DLa3prK9c",
    order:"viewcount",
    type:"video",
    maxResults:5
  };

  var url="https://www.googleapis.com/youtube/v3/search?";
  for(var option in optionParams){
    url+=option+"="+optionParams[option]+"&";
  }

  url=url.substr(0, url.length-1);  //마지막에 붙어있는 & 정리
  console.log(url)

  request(url, function(err, response){
    if (err) throw new Error(err);
    console.log(response.body)
    res.send(response.body);
  });
});


app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))