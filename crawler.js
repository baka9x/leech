//file: index.js
const rp = require("request-promise");
const cheerio = require("cheerio");
const request = require('request');
const url = require('url')
const https = require('https')
const sizeOf = require('image-size')
const fs = require("fs");
const dslink = "dslink.txt";
const domain = "https://hoanguyenit.com";
const img_width=500;
const img_heigth=250;

///watemat
const Jimp = require("jimp");
const LOGO = __dirname+"/images/logo.png";
const main = async (a) => {
    //  console.log( a);
    const [image, logo] = await Promise.all([
      Jimp.read(a),
      Jimp.read(LOGO)
    ]);

    logo.resize(logo.bitmap.width , Jimp.AUTO);
   // const X=30;
   // const Y=image.bitmap.height - logo.bitmap.height;
    //console.log(X +"/"+Y);
    const X=10;
    const Y=10;

    return image.composite(logo, X, Y, [
      {
        mode: Jimp.BLEND_SCREEN,
        opacitySource: 0.1,
        opacityDest: 1
      }
    ]);
  };
//end



var array = fs.readFileSync(dslink).toString().split("\n");
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function removeItemAll(arr, value) {
    var i = 0;
    while (i < arr.length) {
        if (arr[i] === value) {
            arr.splice(i, 1);
        } else {
            ++i;
        }
    }
    return arr;
}
async function crawler() {
    await sleep(1000);
    for (i in array) {
        const linkchay = array[i];

        try {
            const options = {
                uri: linkchay,
                transform: function (body) {
                    //Khi lấy dữ liệu từ trang thành công nó sẽ tự động parse DOM
                    return cheerio.load(body);
                },
            };
            var $ = await rp(options);
        } catch (error) {
            console.log("Link dang dung:" + array[i]);
            return error;
        }

        /* Lấy tên và miêu tả của tutorial*/
        const title = $(".ten_title").text().trim();
        //const description = $(".entry-content > p").text().trim();

        /* Phân tích các table và sau đó lấy các posts.
           Mỗi table là một chương 
        */
        const tableContent = $(".info_content");
        let data = [];
        // Tên của chương đó.
        let chaperTitle = tableContent.find("p").text().trim();


        //Tìm bài viết ở mỗi chương
        let namefile = "";
        let chaperData = []
        const chaperLink = tableContent.find("p").find("img");

        for (let j = 0; j < chaperLink.length; j++) {
            const post = $(chaperLink[j]);
            const postLink = post.attr("src");
            //download
            const n = postLink.lastIndexOf("/");
            const filename = postLink.substring(n + 1, postLink.length);
            namefile = filename;
            download(postLink, filename, function () {
                //console.log("Link:"+linkchay);
            });
            const postTitle = post.text().trim();
            chaperData.push({
                postTitle,
                linkchay,
                filename,
            });
        }
        data.push({
            chaperTitle,
            chaperData,

        });


        // Lưu dữ liệu về máy
        fs.writeFileSync('data.json', JSON.stringify(data))
        console.log(linkchay + "------------->done");
        removeItemAll(array, linkchay);
        await sleep(1000);
    }


};

crawler();

async function getFilesizeInBytes(filename) {
    const stats = fs.statSync(filename);
    const fileSizeInBytes = stats.size;
    return fileSizeInBytes;
}

var download = function (uri, filename, callback) {
    var link = "";
    if (uri.search("https") == -1) {
        link = domain + "/" + uri;
    } else {
        link = uri;
    }

    const imgUrl = link;
    const options = url.parse(imgUrl);
    https.get(options, function (response) {
        const chunks = []
        response.on('data', function (chunk) {
          chunks.push(chunk)
        }).on('end', function() {
          const buffer = Buffer.concat(chunks)
          let width = sizeOf(buffer).width;
          let height = sizeOf(buffer).height;
          //check size image mà ta muốn lấy
          if(width>200 && height>200){
            request.head(link, function (err, res, body) {
                if(res.statusCode==200){
                    request(link).pipe(fs.createWriteStream('./images/' + filename)).on('close', callback);
                    setTimeout(function(){
                        main(__dirname+"/images/"+filename).then(image => image.write(__dirname+"/luu/"+filename));
                    },2000);

                }

            });
          }
        })
    })


};
