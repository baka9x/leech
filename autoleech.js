const puppeteer = require('puppeteer')
const fs = require('fs')
const downloader = require('image-downloader')
const readline = require('readline-sync')
//const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest
const axios = require('axios')
process.setMaxListeners(Infinity)


const instance = axios.create({
    baseURL: 'https://img.manhwa16.xyz'
});

instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';

function getLeechPath(url) {
    const pattern = /https:\/\/(.*?)\/(.*?)\/chapter-(.*?)\.html/g
    if (url.match(pattern)) {
        url = url.replace(pattern, 'https://manga18fx.com/manga/$2/chapter-$3')
    }
    //console.log(url)
    return url
}


function getOriginalImageFromSrcSet(srcSet) {//,dirName){
    // const pattern = /https:\/\/(.*?)\/(.*?)\/(.*?)\/(.*?)\/(.*?).jpg/g
    //imgSrc = srcSet.replace(pattern, '<p><img src="https://cdn5.manhwamanga.net/series/' +dirName+ '/$5.jpg"/></p>')

    const pattern = /https?:\/\/(.*?)\.jpg/g
    const ads1 = /https?:\/\/(.*?)\.ackcdn.net\/library\/(.*?)\.jpg/g
    const ads2 = /https?:\/\/(.*?)\.ackcdn.net\/library\/(.*?)\.gif/g
    const pattern2 = /https?:\/\/(.*?)\.googleusercontent\.com\/(.*?)\=s0/g
    const pattern3 = /https?:\/\/(.*?)\.png/g
    //const pattern4 = /http://cdn6.truyentranh8.net/hdd2/u2/Amodsubvn/31362/1-/khong-co-tieu-de616.png/g
    srcSet = srcSet.replace(ads1, '')
    srcSet = srcSet.replace(ads2, '')
    srcSet = srcSet.replace('https://doctruyen3q.net/images/default/banner-chapter.jpg', '')
    imgSrc = srcSet.replace(pattern, '<p><img src="https://$1.jpg"/></p>')
    imgSrc = imgSrc.replace(pattern2, '<p><img src="https://$1.googleusercontent.com/$2=s0"/></p>')
    imgSrc = imgSrc.replace(pattern3, '<p><img src="https://$1.png"/></p>')

    //imgSrc = imgSrc.replace('/./', '/')
    return imgSrc
}
async function getListChapterManga18fx(url) {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.setDefaultNavigationTimeout(0);
    await page.goto(url)
    const linkSelects = await page.evaluate(() => {
        const hrefs = Array.from(document.querySelectorAll('.row-content-chapter a'))
        const hrefSetAttribute = hrefs.map(i => i.getAttribute('href'))

        return hrefSetAttribute
    })
    await browser.close()
    return linkSelects
}

//https://manga18fx.com/manga/different-dream/chapter-1
async function getNextChapterManga18fx(url) {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.setDefaultNavigationTimeout(0);
    await page.goto(url)
    const linkSelects = await page.evaluate(() => {
        const hrefs = Array.from(document.querySelectorAll('.navi-change-chapter-btn a'))
        const hrefSetAttribute = hrefs.map(i => i.getAttribute('href'))

        return hrefSetAttribute
    })
    await browser.close()
    return linkSelects
}


async function loadChapterFromListManga18fx(url) {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    await page.setDefaultNavigationTimeout(0);
    await page.goto(url)

    const imageSrcSets = await page.evaluate(() => {
        const imgs = Array.from(document.querySelectorAll('.read-content img'))
        const srcSetAttribute = imgs.map(i => i.getAttribute('src'))

        return srcSetAttribute
    })
    //const imgUrls = imageSrcSets.map(srcSet => getOriginalImageFromSrcSet(srcSet))
    await browser.close()
    return imageSrcSets
}


async function sendTOBE(url, content) {
    instance.post('/doctruyen3q.php', {
        url: url,
        content: content
    })
        .then(function (response) {
            console.log(response.data);
        })
        .catch(function (error) {
            console.log("????????>>>" + error);
        });
}

async function main() {
    let domain = 'https://manga18fx.com/'
    let urlLink = readline.question("Nhap Link Chapter 1 Manga18fx: ")
    const chapterLists = await getNextChapterManga18fx(getLeechPath(urlLink))
  
    // if(chapterLists.length > 0){
    //     console.log('Co tong cong: ' + chapterLists.length + ' Chapter')
    //     chapterLists.forEach(async (item, index) => {
    //         let images = await loadChapterFromListManga18fx(getLeechPath(domain + item))
    //         console.log(index + ' => ' + domain + item + ' => OK')
          
    //     })
    // }else{
    //     console.log('Co loi xay ra.')
    // }

    console.log(chapterLists)

    // images.forEach((img) => {
    //     downloader.image({
    //         url: img.replace('https://', 'https://i2.wp.com/'),
    //         dest: resultFolder
    //     })
    // })



}
main()