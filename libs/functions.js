const axios = require('axios')
const puppeteer = require('puppeteer')
//const fs = require('fs')
const downloader = require('image-downloader')


const instance = axios.create({
    baseURL: 'https://img.manhwa16.xyz'
});
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';

const instance2 = axios.create({
    baseURL: 'https://baka9x.com/api/'
});
instance2.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';


async function getImagesFromUrlManga18fx(url) {
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
    //const imgUrls = imageSrcSets.map(srcSet => getOriginalImageFromSrcSet(srcSet))
    await browser.close()
    return linkSelects
}


async function getListChapterTruyenDamOrg(url) {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    await page.setDefaultNavigationTimeout(0);
    await page.goto(url)

    const linkSelects = await page.evaluate(() => {
        const hrefs = Array.from(document.querySelectorAll('.bai-viet-box a.post-page-numbers'))

        const hrefSetAttribute = hrefs.map(i => i.getAttribute('href'))

        return hrefSetAttribute
    })
    //const imgUrls = imageSrcSets.map(srcSet => getOriginalImageFromSrcSet(srcSet))
    await browser.close()
    return linkSelects
}


async function getContentFromTruyenDamOrg(url) {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.setDefaultNavigationTimeout(0);
    await page.goto(url)

    const element = await page.waitForSelector('div[style="background:#f7f7f7;border:1px solid #ddd;color:#333;margin-bottom:5px;line-height:150%;padding:5px;font-size:14px"]'); // select the element
    const value = await element.evaluate(el => el.textContent);
    await browser.close()
    return value
}

async function getContentFromTruyenSac(url) {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.setDefaultNavigationTimeout(0);
    await page.goto(url)
    const innerHTML = await page.evaluate(() => {
        for (const script of document.body.querySelectorAll('script')) script.remove();
        return document.body.innerHTML;
      });
    const element = await page.waitForSelector('div.ndtruyen'); // select the element
    const value = await element.evaluate(el => el.textContent);
    await browser.close()
    return value
}





async function getImagesFromUrlDocTruyen3Q(url) {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.setDefaultNavigationTimeout(0);
    await page.goto(url)

    const imageSrcSets = await page.evaluate(() => {
        const imgs = Array.from(document.querySelectorAll('.list-image-detail img'))
        const srcSetAttribute = imgs.map(i => i.getAttribute('src'))
        for (var i = 0; i < srcSetAttribute.length; i++) {
            if (srcSetAttribute[i] === null || srcSetAttribute[i] === ' ' || srcSetAttribute[i] === '') {
                srcSetAttribute[i] = '';
            }

        }
        return srcSetAttribute
    })
    //const imgUrls = imageSrcSets.map(srcSet => getOriginalImageFromSrcSet(srcSet))
    await browser.close()
    return imageSrcSets
}

async function getImagesFromUrlDuaLeoTruyen(url) {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.setDefaultNavigationTimeout(0);
    await page.goto(url)

    const imageSrcSets = await page.evaluate(() => {
        const imgs = Array.from(document.querySelectorAll('.content_view_chap img'))
        const srcSetAttribute = imgs.map(i => i.getAttribute('src'))
        // for (var i = 0; i < srcSetAttribute.length; i++) {
        //     if (srcSetAttribute[i] === null || srcSetAttribute[i] === ' ' || srcSetAttribute[i] === '') {
        //       srcSetAttribute[i] = '';
        //     }

        //   }
        return srcSetAttribute
    })
    //const imgUrls = imageSrcSets.map(srcSet => getOriginalImageFromSrcSet(srcSet))
    await browser.close()
    return imageSrcSets
}

async function getImagesFromUrlQManga(url) {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.setDefaultNavigationTimeout(0);
    await page.goto(url)

    const imageSrcSets = await page.evaluate(() => {
        const imgs = Array.from(document.querySelectorAll('.image-commic img'))
        console.log(imgs)
        const srcSetAttribute = imgs.map(i => i.getAttribute('src'))
        for (var i = 0; i < srcSetAttribute.length; i++) {
            if (srcSetAttribute[i] === null || srcSetAttribute[i] === ' ' || srcSetAttribute[i] === '') {
                srcSetAttribute[i] = '';
            }

        }
        return srcSetAttribute
    })
    //const imgUrls = imageSrcSets.map(srcSet => getOriginalImageFromSrcSet(srcSet))
    await browser.close()
    return imageSrcSets
}

async function getImagesFromUrlTruyenTranh86(url) {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    await page.setDefaultNavigationTimeout(0);
    await page.goto(url)

    const imageSrcSets = await page.evaluate(() => {
        const imgs = Array.from(document.querySelectorAll('.reading-detail.box_doc img'))
        const srcSetAttribute = imgs.map(i => i.getAttribute('src'))
        for (var i = 0; i < srcSetAttribute.length; i++) {
            if (srcSetAttribute[i] === null || srcSetAttribute[i] === ' ' || srcSetAttribute[i] === '') {
                srcSetAttribute[i] = '';
            }

        }
        return srcSetAttribute
    })
    //const imgUrls = imageSrcSets.map(srcSet => getOriginalImageFromSrcSet(srcSet))
    await browser.close()
    return imageSrcSets
}



async function getImagesFromUrlTruyenMoiZZ(url) {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    await page.setDefaultNavigationTimeout(0);
    await page.goto(url)

    const imageSrcSets = await page.evaluate(() => {
        const imgs = Array.from(document.querySelectorAll('.chapter-content img'))
        const srcSetAttribute = imgs.map(i => i.getAttribute('data-src'))
        for (var i = 0; i < srcSetAttribute.length; i++) {
            if (srcSetAttribute[i] === null || srcSetAttribute[i] === ' ' || srcSetAttribute[i] === '') {
                srcSetAttribute[i] = '';
            }

        }
        return srcSetAttribute
    })
    //const imgUrls = imageSrcSets.map(srcSet => getOriginalImageFromSrcSet(srcSet))
    await browser.close()
    return imageSrcSets
}

async function getImagesFromUrlSayHentai(url) {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    await page.setDefaultNavigationTimeout(0);
    await page.goto(url)

    const imageSrcSets = await page.evaluate(() => {
        const imgs = Array.from(document.querySelectorAll('.content-chap-image img'))
        const srcSetAttribute = imgs.map(i => i.getAttribute('src'))
        for (var i = 0; i < srcSetAttribute.length; i++) {
            if (srcSetAttribute[i] === null || srcSetAttribute[i] === ' ' || srcSetAttribute[i] === '') {
                srcSetAttribute[i] = '';
            }

        }
        return srcSetAttribute
    })
    //const imgUrls = imageSrcSets.map(srcSet => getOriginalImageFromSrcSet(srcSet))
    await browser.close()
    return imageSrcSets
}

async function getImagesFromUrlMangaTuLi(url) {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    await page.setDefaultNavigationTimeout(0);
    await page.goto(url)

    const imageSrcSets = await page.evaluate(() => {
        const imgs = Array.from(document.querySelectorAll('.reading-content img'))
        const srcSetAttribute = imgs.map(i => i.getAttribute('src'))
        for (var i = 0; i < srcSetAttribute.length; i++) {
            if (srcSetAttribute[i] === null || srcSetAttribute[i] === ' ' || srcSetAttribute[i] === '') {
                srcSetAttribute[i] = '';
            }

        }
        return srcSetAttribute
    })
    //const imgUrls = imageSrcSets.map(srcSet => getOriginalImageFromSrcSet(srcSet))
    await browser.close()
    return imageSrcSets
}

async function getImagesFromUrlTruyenVN(url) {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    await page.setDefaultNavigationTimeout(0);
    await page.goto(url)

    const imageSrcSets = await page.evaluate(() => {
        const imgs = Array.from(document.querySelectorAll('.content-text img'))
        const srcSetAttribute = imgs.map(i => i.getAttribute('data-src'))
        for (var i = 0; i < srcSetAttribute.length; i++) {
            if (srcSetAttribute[i] === null || srcSetAttribute[i] === ' ' || srcSetAttribute[i] === '') {
                srcSetAttribute[i] = '';
            }

        }
        return srcSetAttribute
    })
    //const imgUrls = imageSrcSets.map(srcSet => getOriginalImageFromSrcSet(srcSet))
    await browser.close()
    return imageSrcSets
}

//HENTAIVV
async function getImagesFromUrlHentaiVV(url) {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    await page.setDefaultNavigationTimeout(0);
    await page.goto(url)

    const imageSrcSets = await page.evaluate(() => {
       
        const imgs = Array.from(document.querySelectorAll('.reading img'))
        const srcSetAttribute = imgs.map(i => i.getAttribute('data-echo'))
        
        for (var i = 0; i < srcSetAttribute.length; i++) {
            if (srcSetAttribute[i] === null || srcSetAttribute[i] === ' ' || srcSetAttribute[i] === '') {
                srcSetAttribute[i] = '';
                
            }

        }
        

        return srcSetAttribute
    })

    
    //const imgUrls = imageSrcSets.map(srcSet => getOriginalImageFromSrcSet(srcSet))
    await browser.close()
    return imageSrcSets
}


async function getImagesFromUrlHentaiVV2(url) {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    
    await page.setDefaultNavigationTimeout(0);
    await page.goto(url)

    const imageSrcSets = await page.evaluate(() => {
       
        const imgs = Array.from(document.querySelectorAll('.reading img'))
        const srcSetAttribute = imgs.map(i => i.getAttribute('src'))
        
        for (var i = 0; i < srcSetAttribute.length; i++) {
            if (srcSetAttribute[i] === null || srcSetAttribute[i] === ' ' || srcSetAttribute[i] === '') {
                srcSetAttribute[i] = '';
              
            }

            
        }
       
        return srcSetAttribute
    })

    //const imgUrls = imageSrcSets.map(srcSet => getOriginalImageFromSrcSet(srcSet))
    await browser.close()
    return imageSrcSets
}

async function getTieuDeHentaiVV(url) {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    await page.setDefaultNavigationTimeout(0);
    await page.goto(url)

    const element = await page.waitForSelector('h1.crop-text-1'); // select the element
    const value = await element.evaluate(el => el.textContent);
    //const imgUrls = imageSrcSets.map(srcSet => getOriginalImageFromSrcSet(srcSet))
    await browser.close()
    return value
}

async function getTieuDeHentaiVV2(url) {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    await page.setDefaultNavigationTimeout(0);
    await page.goto(url)

    const element = await page.waitForSelector('h1.text-center'); // select the element
    const value = await element.evaluate(el => el.textContent);
    //const imgUrls = imageSrcSets.map(srcSet => getOriginalImageFromSrcSet(srcSet))
    await browser.close()
    return value
}


async function getListChapterHentaiVV(url) {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    await page.setDefaultNavigationTimeout(0);
    await page.goto(url)

    const linkSelects = await page.evaluate(() => {
        const hrefs = Array.from(document.querySelectorAll('ul.listchap.clearfix a'))
        console.log(hrefs)
        const hrefSetAttribute = hrefs.map(i => i.getAttribute('href'))
        return hrefSetAttribute
    })
    //const imgUrls = imageSrcSets.map(srcSet => getOriginalImageFromSrcSet(srcSet))
    await browser.close()
    return linkSelects
}



module.exports = {

    getImagesFromUrlManga18fx: getImagesFromUrlManga18fx,

    getImagesFromUrlDocTruyen3Q: getImagesFromUrlDocTruyen3Q,

    getImagesFromUrlTruyenMoiZZ: getImagesFromUrlTruyenMoiZZ,

    getListChapterManga18fx: getListChapterManga18fx,

    getImagesFromUrlTruyenTranh86: getImagesFromUrlTruyenTranh86,

    getImagesFromUrlTruyenVN: getImagesFromUrlTruyenVN,

    getImagesFromUrlQManga: getImagesFromUrlQManga,

    getImagesFromUrlDuaLeoTruyen: getImagesFromUrlDuaLeoTruyen,

    getImagesFromUrlSayHentai: getImagesFromUrlSayHentai,

    getImagesFromUrlMangaTuLi: getImagesFromUrlMangaTuLi,

    getContentFromTruyenDamOrg: getContentFromTruyenDamOrg,

    getListChapterTruyenDamOrg: getListChapterTruyenDamOrg,

    getContentFromTruyenSac: getContentFromTruyenSac,

    getImagesFromUrlHentaiVV: getImagesFromUrlHentaiVV,

    getImagesFromUrlHentaiVV2: getImagesFromUrlHentaiVV2,

    getListChapterHentaiVV: getListChapterHentaiVV,

    getTieuDeHentaiVV: getTieuDeHentaiVV,

    getTieuDeHentaiVV2: getTieuDeHentaiVV2,



    getLeechPath: function (url) {
        const pattern = /https:\/\/(.*?)\/(.*?)\/chapter-(.*?)\.html/g
        const pattern2 = /https:\/\/hadamanga.com\/manga\/(.*?)\-chapter\-(.*?)/g
        const patternTruyen321Chapter = /https:\/\/truyen321.net\/(.*?)\/chapter-(.*?)\.html/g
        const patternTruyen321 = /https:\/\/truyen321.net\/(.*?)\.html/g

        const patternHentaiManhwa = /https:\/\/hentaimanhwa.net\/(.*?)\.html/g

        if (url.match(patternHentaiManhwa)) {
            url = url.replace(patternHentaiManhwa, 'https://manga18fx.com/manga/$1')
        }


        if (url.match(pattern)) {
            url = url.replace(pattern, 'https://manga18fx.com/manga/$2/chapter-$3')
        }

        if (url.match(pattern2)) {

            url = url.replace(pattern2, 'https://manga18fx.com/manga/$1-eng/chapter-$2')
        }

        if (url.match(patternTruyen321Chapter)) {

            url = url.replace(patternTruyen321Chapter, 'https://truyendam.org/$1/$2/')
        }
        if (url.match(patternTruyen321)) {
            url = url.replace(patternTruyen321, 'https://truyendam.org/$1/')
        }

        //https://truyendam.org/$1/$2/
        return url

    },
    getOriginalImageFromSrcSet: function (srcSet, dirName = null) {

        //Manga18fx
        const pattern = /https?:\/\/(.*?)\.jpg/g
        const pattern2 = /https?:\/\/(.*?)\/(.*?)\/(.*?)\/(.*?)\/(.*?).jpg/g

        //DocTruyen3Q
        const pattern3 = /https?:\/\/(.*?)\.googleusercontent\.com\/(.*?)\=s0/g
        const pattern4 = /https?:\/\/(.*?)\.png/g

        //TruyenMoiZZ
        const pattern5 = /https?:\/\/(.*?)\.jpeg/g

        const pattern6 = /https?:\/\/(.*?)\.gif/g


        const ads1 = /https?:\/\/(.*?)\.ackcdn.net\/library\/(.*?)\.jpg/g
        const ads2 = /https?:\/\/(.*?)\.ackcdn.net\/library\/(.*?)\.gif/g
        const ads3 = /https?:\/\/(.*?)\.ackcdn.net\/library\/(.*?)\.jpeg/g
        const ads4 = /https?:\/\/(.*?)\.ackcdn.net\/library\/(.*?)\.png/g



        srcSet = srcSet.replace(ads1, '')
        srcSet = srcSet.replace(ads2, '')
        srcSet = srcSet.replace(ads3, '')
        srcSet = srcSet.replace(ads4, '')
        srcSet = srcSet.replace('?imgmax=0', '')
       
        srcSet = srcSet.replace('https://novelhd.com/wp-content/themes/truyenfull/proxy/proxy.php?url=https://sv5.ghienmanga.net/images/2020/09/23/credit-nhom-dich-lao-mieu65439966c78e456c.jpg', '')
        srcSet = srcSet.replace('https://novelhd.com/wp-content/themes/truyenfull/proxy/proxy.php?url=https://sv5.ghienmanga.net/images/2020/09/03/credit-truyen-secret-class6ba202ad70cde516.jpg', '')
        srcSet = srcSet.replace('https://doctruyen3q.com/images/default/banner-chapter.jpg', '')
        srcSet = srcSet.replace('https://lh3.googleusercontent.com/fife/AAWUweXfsmW0PfC0vX9llzyx3-UYQrBwnFQ1D6zHn6NWC8rWoFSpXlMy_CjY1CQCDhFtsjKJrURetRmV5-1IehTE2alVO7iRbVxUUTxq_zTbVqvOA3wo2umHeMBHLfh-3SmeHYXFTIu-gF83TB2y2Mwu77hVcj_1RwPn2Kn4fuBjFifduLHs329LObwHZ5nW_5FZSV9_oGOtQRPsb5nqbwQcyY61FLEh_9w4iDlCbHjXoO8JHOvc7oUm7EGLm-p5hn0bdtGKczXgRJHDPiVu1upCBGY_86q9mVYueDMWLD1ekZ51l4oJidsKDshzKa2HWzbMimQO8grqEI0qrGo0YMmjDCJNzZwem-pjeI5srKalEYjPr7833bQhu5IUcmNFlHli8e2Vl05tpPBLDziJtaAeK2wMFjdeK3Xp8kCLwC7t746mOqWuW4g59CWWHv8tU90SnGRD8E1o-lKJrqIHtYMwrfs-hH5oucTVE8KDdk-MiJ1k5YzW3gZuehDrzprZpvaTJjKP4ga2yu8mOaMvmhQcJt8ReYgygxjiEVpt5cnnC-JImWSx5NGIHxSTpk0wS8BzRo3aF2QaWW4b85IZXEUI-nsJCU6ARC1mRYjPSfWyq-Hg8sO1atwVS9FgkDtpJBhIHYPBeo5mvMKvNFbdTeuGbIcYE82Cc1mk8mq_j-_JRlWT1tIoOwtQ8EX0wwN8Y4xcDYjggV2x2AFWH25kNN6H782m9MHu=ft', '')
        srcSet = srcSet.replace('https://novelhd.com/wp-content/themes/truyenfull/proxy/proxy.php?url=https://sayhentai.net/app/manga/uploads/credit.jpg', '')
        //srcSet = srcSet.replace('https://novelhd.com/wp-content/themes/truyenfull/proxy/proxy.php?url=https://cdn.statically.io/img/truyenvn.tv/f=auto/wp-content/uploads/2021/09/truyenvn-tv-banner.jpg','')
        imgSrc = srcSet.replace(pattern, '<p><img src="https://$1.jpg"/></p>')
        imgSrc = imgSrc.trim()
        //DocTruyen3Q
        imgSrc = imgSrc.replace(pattern3, '<p><img src="https://$1.googleusercontent.com/$2=s0"/></p>')
        imgSrc = imgSrc.replace(pattern4, '<p><img src="https://$1.png"/></p>')
        //TruyenMoiZZ
        imgSrc = imgSrc.replace(pattern5, '<p><img src="https://$1.jpeg"/></p>')
        imgSrc = imgSrc.replace(pattern6, '<p><img src="https://$1.gif"/></p>')
        //

        // if (dirName != null) {
        //     imgSrc = srcSet.replace(pattern2, '<p><img src="https://cdn6.manhwamanga.net/series/' + dirName + '/$5.jpg"/></p>')
        //     imgSrc = imgSrc.replace('/./', '/')
        // }

        imgSrc = imgSrc.replace('<p><img src="https://hentaivv.com/wp-content/themes/truyenfull/echo/img/loading4.png"/></p>','')
        //imgSrc = imgSrc.replace('https://novelhd.com/wp-content/themes/truyenfull/proxy/proxy.php?url=','')
        return imgSrc.trim()
    },

    getReplaceContentTruyenChu: function (content) {
        const patternTruyenSac = /https?:\/\/truyensac.net\/(.*?)\//g
        const adsTruyenSac = /<script>(.*?)<\/script>/g
        
        content = content.replace(patternTruyenSac, 'https://truyen321.net/$1.html')
        content = content.replace('truyendam.org', 'truyen321.net')
        content = content.replace('Truyendam.Org', 'truyen321.net')
        content = content.replace('truyentv.net', 'truyen321.net')
        content = content.replace('TruyenTv.net', 'truyen321.net')
        content = content.replace('truyensac.net', 'truyen321.net')
        content = content.replace('TRUYENTV.NET', 'truyen321.net')
        content = content.replace('TruyenTv.Net', 'truyen321.net')
        return content;
    },

    getOriginalFullLink: function (path) {
        const hrefLink = path.replace('/manga/', 'https://manga18fx.com/manga/')
        return hrefLink;
    },


    sendTOBEManhwaManga: async function (url, content) {
        instance.post('/wp_update_chapter_manhwamanga.php', {
            url: url,
            content: content
        })
            .then(function (response) {
                console.log(response.data);
            })
            .catch(function (error) {
                console.log("????????>>>" + error);
            });

    },


    sendTOBEHentaiManhwa: async function (url, content) {
        instance2.post('/wp_update_chapter_hentaimanhwa.php', {
            url: url,
            content: content
        })
            .then(function (response) {
                console.log(response.data);
            })
            .catch(function (error) {
                console.log("????????>>>" + error);
            });

    },

    sendTOBEHentaiBaka: async function (url, content) {
        instance2.post('/wp_update_chapter_hentaibaka.php', {
            url: url,
            content: content
        })
            .then(function (response) {
                console.log(response.data);
            })
            .catch(function (error) {
                console.log("????????>>>" + error);
            });

    },


    sendTOBEHadaManga: async function (url, content) {
        instance2.post('/wp_update_chapter_hadamanga.php', {
            url: url,
            content: content
        })
            .then(function (response) {
                console.log(response.data);
            })
            .catch(function (error) {
                console.log("????????>>>" + error);
            });

    },


    sendTOBEMWManga: async function (url, content) {
        instance.post('/wp_update_chapter_mwmanga.php', {
            url: url,
            content: content
        })
            .then(function (response) {
                console.log(response.data);
            })
            .catch(function (error) {
                console.log("????????>>>" + error);
            });

    },


    sendTOBETruyen321: async function (url, content, mangaSlug = null, chapterSlug = null) {
        instance2.post('/wp_update_chapter_truyen321.php', {
            url: url,
            content: content,
            mangaSlug: mangaSlug,
            chapterSlug: chapterSlug
        })
            .then(function (response) {
                console.log(response.data);
            })
            .catch(function (error) {
                console.log("????????>>>" + error);
            });

    },

    sendTOBEMWHentai: async function (url, content, mangaSlug = null, chapterSlug = null, tieuDeTruyen = null) {
        instance2.post('/wp_update_chapter_mwhentai.php', {
            url: url,
            content: content,
            mangaSlug: mangaSlug,
            chapterSlug: chapterSlug,
            tieuDeTruyen: tieuDeTruyen
        })
            .then(function (response) {
                console.log(response.data);
            })
            .catch(function (error) {
                console.log("????????>>>" + error);
            });

    },

    downloadImage: function (images, resultFolder) {

        images.forEach((img) => {
            downloader.image({
                headers: {
                    Referer: "https://manga18fx.com"
                },

                url: img,//.replace('https://', 'https://i2.wp.com/'),
                dest: resultFolder


            })


        })


    }
}