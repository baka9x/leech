
const readline = require('readline-sync')
//const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest
const fs = require('fs')
const crypto = require("crypto")
const bakaFunction = require('./libs/functions')
var checkOption = true
const listLink = "dslink.txt";
const Jimp = require('jimp');


var array = fs.readFileSync(listLink).toString().split("\n");

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


async function ShowIndex() {

    while (checkOption) {
        console.log("+---------------------------------------------------------+")
        console.log("|***********       BAKA LEECH TOOLS       ****************|")
        console.log("+------------------------ManhwaManga.Net------------------+")
        console.log("|-01. Download Manga18fx   --> Update                     |")
        console.log("|-02. Leech Manga18Fx      --> OK                         |")
        console.log("|-03. Leech MangaTuLi      --> For MwManga                |")
        console.log("|-04. Leech and Fix List Link     --> NEW                 |")
        console.log("|-05. Leech SayHentai                                     |")
        console.log("|-06. Leech Chapter Manga18fx                             |")
        console.log("+----------------------MWManga.Net------------------------+")
        console.log("|-07. Leech DocTruyen3Q    --> OK                         |")
        console.log("|-08. Leech TruyenMoiZZ    --> OK                         |")
        console.log("|-09. Fix MwManga                                         |")
        console.log("|-10. Leech TruyenVN       --> OK                         |")
        console.log("|-11. Leech TruyenTranh86  --> OK                         |")
        console.log("|-12. Leech QManga         --> OK                         |")
        console.log("|-13. Leech DuaLeoTruyen   --> OK                         |")
        console.log("+----------------------Truyen321.Net----------------------+")
        console.log("|-14. Leech Full Chapter TruyenDam /TruyenSac             |")
        console.log("|-15. Leech Chapter TruyenDam.Org /TruyenSac              |")
        console.log("|-00. Exit                                                |")
        console.log("+---------------------------------------------------------+")

        let option = readline.question("Input a Option (1 -> 14): ")
        switch (parseInt(option)) {
            case 1:
                await downloadManga18fx();
                break;
            case 2:
                await leechManga18fx();
                break;
            case 3:
                await leechMangatuli();
                break;
            case 4:
                await leechAndFixListLink();
                break;
            case 5:
                await leechSayHentai();
                break;
            case 6:
                await leechChapterListManga18fx();
                break;
            case 7:
                await leechDocTruyen3Q();
                break;
            case 8:
                await leechTruyenMoiZZ();
                break;
            // case 9:
            //     await fixMwManga();
            //     break;
            case 10:
                await leechTruyenVN();
                break;
            case 11:
                await leechTruyenTranh86();
                break;
            case 12:
                await leechQManga();
                break;
            case 13:
                await leechDuaLeoTruyen();
                break;
            case 14:
                await leechTruyenDamOrg();
                break;
            case 15:
                await leechChapterTruyenDamTruyenSac();
                break;
            case 16:
                await leechHentaivv();
                break;
            case 17:
                await leechChapterHentaiVV();
                break;

            case 18:
                await leechChapterHentaiVV2();
                break;
            case 19:
                await leechHentaiManhwa();
                break;

            case 99:
                await testCodeLeech();
                break;
            case 00:
                console.log("You exited!.");
                break;
            default:
                console.log("Input a option.")
                break;
        }
        if (option == 14) {
            console.log("Thank you for used this tools.");
            break;
        }

    }
}

async function uploadToBEManhwaManga(url, content) {
    if (content != '') {
        console.log("|***********       RESULT       ****************|")
        //const data = 'url=' + urlLink + '&content=' + replaceUrls.join('\n')
        //updateChapter(data)
        console.log(content.join('\n'))
        await bakaFunction.sendTOBEManhwaManga(bakaFunction.getLeechPath(url), content.join('\n'))
    } else {
        console.log("Error! Truyen Nay Khong The Leech Hoac Bi Loi.\nVui Long Kiem Tra Lai!")
    }
}

async function uploadToBEHadaManga(url, content) {
    if (content != '') {
        console.log("|***********       RESULT       ****************|")
        //const data = 'url=' + urlLink + '&content=' + replaceUrls.join('\n')
        //updateChapter(data)
        console.log(content.join('\n'))
        await bakaFunction.sendTOBEHadaManga(bakaFunction.getLeechPath(url), content.join('\n'))
    } else {
        console.log("Error! Truyen Nay Khong The Leech Hoac Bi Loi.\nVui Long Kiem Tra Lai!")
    }
}

async function uploadToBEMWManga(url, content) {
    if (content != '') {
        console.log("|***********       RESULT       ****************|")
        //const data = 'url=' + urlLink + '&content=' + replaceUrls.join('\n')
        //updateChapter(data)
        await bakaFunction.sendTOBEMWManga(bakaFunction.getLeechPath(url), content.join('\n'))
    } else {
        console.log("Error! Truyen Nay Khong The Leech Hoac Bi Loi.\nVui Long Kiem Tra Lai!")
    }
}

async function testCodeLeech() {

    let inputLink = readline.question("Nhap link: ")
    let listLink = await bakaFunction.getListChapterHentaiVV(inputLink)
    //let replaceUrls = listLink.map(srcSet => bakaFunction.getOriginalImageFromSrcSet(srcSet))
    //listLink = await bakaFunction.getReplaceContentTruyenChu(listLink)
    //listLink = [inputLink + '1/', ...listLink]
    console.log(listLink)
}

//HentaiVV

async function leechChapterHentaiVV() {
    const patternLeech1 = /https:\/\/hentaivv.com\/truyen\/(.*?)\/chap\/(.*?)-chuong-(.*?)\//g
    let tenTruyenGoc
    let tenChapterTruyen, tieuDeTruyen
    let contents0
    let contents1
    let urlLink = readline.question("Nhap link: ")

    if (patternLeech1.test(urlLink)) {
        tieuDeTruyen = await bakaFunction.getTieuDeHentaiVV2(bakaFunction.getLeechPath(urlLink))
        tenTruyenGoc = urlLink.replace(patternLeech1, '$1')
        tenChapterTruyen = urlLink.replace(patternLeech1, '$3')
        contents0 = await bakaFunction.getImagesFromUrlHentaiVV(urlLink)
        contents1 = contents0.map(srcSet => bakaFunction.getOriginalImageFromSrcSet(srcSet))
        console.log('part 1: ' + contents1.length)

        //contents1 = await contents0.map(srcSet => bakaFunction.getOriginalImageFromSrcSet(srcSet))
    }
    //Kiem tra validate
    if (contents1) {
        console.log('Chuong ' + tenChapterTruyen + ' ---------> DONE')
        bakaFunction.sendTOBEMWHentai(bakaFunction.getLeechPath(urlLink), contents1.join('\n'), tenTruyenGoc, tenChapterTruyen, tieuDeTruyen)
        bakaFunction.sendTOBEMWManga(bakaFunction.getLeechPath(urlLink), contents1.join('\n'))
        bakaFunction.sendTOBEHentaiManhwa(bakaFunction.getLeechPath(urlLink), contents1.join('\n'))
        bakaFunction.sendTOBEHentaiBaka(bakaFunction.getLeechPath(urlLink), contents1.join('\n'))
        console.log(contents1.join('\n'))
    } else {
        console.log(urlLink + ' ---------> TRUYEN KHONG CO NOI DUNG')
    }
    await sleep(500)
    checkOption = false
}

async function leechChapterHentaiVV2() {
    const patternLeech1 = /https:\/\/hentaivv.com\/truyen\/(.*?)\/chap\/(.*?)-chuong-(.*?)\//g
    let tenTruyenGoc
    let tenChapterTruyen
    let tieuDeTruyen
    let contents0
    let contents1
    let urlLink = readline.question("Nhap link: ")

    if (patternLeech1.test(urlLink)) {
        tieuDeTruyen = await bakaFunction.getTieuDeHentaiVV2(bakaFunction.getLeechPath(urlLink))
        tenTruyenGoc = urlLink.replace(patternLeech1, '$1')
        tenChapterTruyen = urlLink.replace(patternLeech1, '$3')
        contents0 = await bakaFunction.getImagesFromUrlHentaiVV2(urlLink)
        contents1 = await contents0.map(srcSet => bakaFunction.getOriginalImageFromSrcSet(srcSet))
    }
    //Kiem tra validate
    if (contents1) {
        console.log('Chuong ' + tenChapterTruyen + ' ---------> DONE')
        bakaFunction.sendTOBEMWHentai(bakaFunction.getLeechPath(urlLink), contents1.join('\n'), tenTruyenGoc, tenChapterTruyen, tieuDeTruyen)
        bakaFunction.sendTOBEMWManga(bakaFunction.getLeechPath(urlLink), contents1.join('\n'))
        bakaFunction.sendTOBEHentaiManhwa(bakaFunction.getLeechPath(urlLink), contents1.join('\n'))
        bakaFunction.sendTOBEHentaiBaka(bakaFunction.getLeechPath(urlLink), contents1.join('\n'))
        console.log(contents1.join('\n'))
    } else {
        console.log(urlLink + ' ---------> TRUYEN KHONG CO NOI DUNG')
    }
    await sleep(500)
    checkOption = false
}

async function leechHentaivv() {
    //const patternWeb = /https:\/\/truyen321.net\/(.*?)\/(.*\$?)\.html/g
    const patternLeech1 = /https:\/\/hentaivv.com\/truyen\/(.*?)\/chap\/(.*?)-chuong-(.*?)\//g
    const patternLeech2 = /https:\/\/truyensac.net\/(.*?)\/(.*?)\//g
    let tenTruyenGoc
    let tenChapterTruyen
    let contents0
    let contents1
    let inputLink = readline.question("Nhap Link Hentaivv: ")
    let listLink = await bakaFunction.getListChapterHentaiVV(bakaFunction.getLeechPath(inputLink))




    const listLink2 = [

        'https://hentaivv.com/truyen/thanh-nien-dong-kinh/chap/6301-chuong-31/',
        'https://hentaivv.com/truyen/thanh-nien-dong-kinh/chap/6301-chuong-32/',
        'https://hentaivv.com/truyen/thanh-nien-dong-kinh/chap/6301-chuong-33/',
        'https://hentaivv.com/truyen/thanh-nien-dong-kinh/chap/6301-chuong-34/',
        'https://hentaivv.com/truyen/thanh-nien-dong-kinh/chap/6301-chuong-35/',
        'https://hentaivv.com/truyen/thanh-nien-dong-kinh/chap/6301-chuong-36/',
        'https://hentaivv.com/truyen/thanh-nien-dong-kinh/chap/6301-chuong-37/',
        'https://hentaivv.com/truyen/thanh-nien-dong-kinh/chap/6301-chuong-38/',
        'https://hentaivv.com/truyen/thanh-nien-dong-kinh/chap/6301-chuong-39/',
        'https://hentaivv.com/truyen/thanh-nien-dong-kinh/chap/6301-chuong-40/',
        'https://hentaivv.com/truyen/thanh-nien-dong-kinh/chap/6301-chuong-41/',
        'https://hentaivv.com/truyen/thanh-nien-dong-kinh/chap/6301-chuong-42/',
        'https://hentaivv.com/truyen/thanh-nien-dong-kinh/chap/6301-chuong-43/',
        'https://hentaivv.com/truyen/thanh-nien-dong-kinh/chap/6301-chuong-44/',
        'https://hentaivv.com/truyen/thanh-nien-dong-kinh/chap/6301-chuong-45/',
        'https://hentaivv.com/truyen/thanh-nien-dong-kinh/chap/6301-chuong-46/',
        'https://hentaivv.com/truyen/thanh-nien-dong-kinh/chap/6301-chuong-47/',
        'https://hentaivv.com/truyen/thanh-nien-dong-kinh/chap/6301-chuong-48/',
        'https://hentaivv.com/truyen/thanh-nien-dong-kinh/chap/6301-chuong-49/',
    ]

    let tieuDeTruyen = await bakaFunction.getTieuDeHentaiVV(bakaFunction.getLeechPath(inputLink))
    console.log('Dang Leech truyen: ' + tieuDeTruyen)
    await sleep(500);
    for (i in listLink) {
        const urlLink = listLink[i];

        try {
            //Lay thong tin chapter truyendam.org
            if (patternLeech1.test(urlLink)) {
                tenTruyenGoc = urlLink.replace(patternLeech1, '$1')
                tenChapterTruyen = urlLink.replace(patternLeech1, '$3')
                //Lay noi dung truyen
                //contents0 = await bakaFunction.getContentFromTruyenDamOrg(bakaFunction.getLeechPath(urlLink))
                //contents1 = await bakaFunction.getReplaceContentTruyenChu(contents0)

                let contents0 = await bakaFunction.getImagesFromUrlHentaiVV2(bakaFunction.getLeechPath(urlLink))
                //bakaFunction.downloadImage(images, resultFolder);

                contents1 = contents0.map(srcSet => bakaFunction.getOriginalImageFromSrcSet(srcSet))


            }

            //Lay thong tin chapter truyensac.net (truyentv.net)
            if (patternLeech2.test(urlLink)) {
                tenTruyenGoc = urlLink.replace(patternLeech2, '$1')
                tenChapterTruyen = urlLink.replace(patternLeech2, '$2')
                //Lay noi dung truyen
                contents0 = await bakaFunction.getContentFromTruyenSac(bakaFunction.getLeechPath(urlLink))
                contents1 = await bakaFunction.getReplaceContentTruyenChu(contents0)

            }

            //Kiem tra validate
            if (contents1) {
                console.log('Chuong ' + tenChapterTruyen + ' ---------> DONE')
                bakaFunction.sendTOBEMWHentai(bakaFunction.getLeechPath(urlLink), contents1.join('\n'), tenTruyenGoc, tenChapterTruyen, tieuDeTruyen)
                bakaFunction.sendTOBEMWManga(bakaFunction.getLeechPath(urlLink), contents1.join('\n'))
                bakaFunction.sendTOBEHentaiManhwa(bakaFunction.getLeechPath(urlLink), contents1.join('\n'))
                bakaFunction.sendTOBEHentaiBaka(bakaFunction.getLeechPath(urlLink), contents1.join('\n'))
            } else {
                console.log(urlLink + ' ---------> TRUYEN KHONG CO NOI DUNG')
            }
        } catch (error) {
            console.log("Current Link:" + listLink[i]);
            return error;
        }
        //removeItemAll(array, urlLink);
        await sleep(500);
        checkOption = false
    }

}


//Truyensac - TruyenDam
async function leechTruyenDamOrg() {
    //const patternWeb = /https:\/\/truyen321.net\/(.*?)\/(.*\$?)\.html/g
    const patternLeech1 = /https:\/\/truyendam.org\/(.*?)\/(.*?)\//g
    const patternLeech2 = /https:\/\/truyensac.net\/(.*?)\/(.*?)\//g
    let tenTruyenGoc
    let tenChapterTruyen
    let contents0
    let contents1
    let inputLink = readline.question("Nhap Link TruyenDam.Org, TruyenSac.Net: ")
    let listLink = await bakaFunction.getListChapterTruyenDamOrg(bakaFunction.getLeechPath(inputLink))
    listLink = [inputLink + '1/', ...listLink]

    await sleep(500);
    for (i in listLink) {
        const urlLink = listLink[i];

        try {
            //Lay thong tin chapter truyendam.org
            if (patternLeech1.test(urlLink)) {
                tenTruyenGoc = urlLink.replace(patternLeech1, '$1')
                tenChapterTruyen = urlLink.replace(patternLeech1, '$2')
                //Lay noi dung truyen
                contents0 = await bakaFunction.getContentFromTruyenDamOrg(bakaFunction.getLeechPath(urlLink))
                contents1 = await bakaFunction.getReplaceContentTruyenChu(contents0)
            }

            //Lay thong tin chapter truyensac.net (truyentv.net)
            if (patternLeech2.test(urlLink)) {
                tenTruyenGoc = urlLink.replace(patternLeech2, '$1')
                tenChapterTruyen = urlLink.replace(patternLeech2, '$2')
                //Lay noi dung truyen
                contents0 = await bakaFunction.getContentFromTruyenSac(bakaFunction.getLeechPath(urlLink))
                contents1 = await bakaFunction.getReplaceContentTruyenChu(contents0)

            }

            //Kiem tra validate
            if (contents1) {
                console.log('Chuong ' + tenChapterTruyen + ' ---------> DONE')
                bakaFunction.sendTOBETruyen321(bakaFunction.getLeechPath(urlLink), contents1, tenTruyenGoc, tenChapterTruyen)
            } else {
                console.log(urlLink + ' ---------> TRUYEN KHONG CO NOI DUNG')
            }
        } catch (error) {
            console.log("Current Link:" + listLink[i]);
            return error;
        }
        //removeItemAll(array, urlLink);
        await sleep(500);
        checkOption = false
    }

}

async function leechChapterTruyenDamTruyenSac() {
    //const patternWeb = /https:\/\/truyen321.net\/(.*?)\/(.*\$?)\.html/g
    const patternLeech1 = /https:\/\/truyendam.org\/(.*?)\/(.*?)\//g
    const patternLeech2 = /https:\/\/truyensac.net\/(.*?)\/(.*?)\//g
    let tenTruyenGoc
    let tenChapterTruyen
    let contents0
    let contents1
    let urlLink = readline.question("Nhap Link TruyenDam.Org, TruyenSac.Net: ")

    //Lay thong tin chapter truyendam.org
    if (patternLeech1.test(urlLink)) {
        tenTruyenGoc = urlLink.replace(patternLeech1, '$1')
        tenChapterTruyen = urlLink.replace(patternLeech1, '$2')
        //Lay noi dung truyen
        contents0 = await bakaFunction.getContentFromTruyenDamOrg(bakaFunction.getLeechPath(urlLink))
        contents1 = await bakaFunction.getReplaceContentTruyenChu(contents0)
    }

    //Lay thong tin chapter truyensac.net (truyentv.net)
    if (patternLeech2.test(urlLink)) {
        tenTruyenGoc = urlLink.replace(patternLeech2, '$1')
        tenChapterTruyen = urlLink.replace(patternLeech2, '$2')
        //Lay noi dung truyen
        contents0 = await bakaFunction.getContentFromTruyenSac(bakaFunction.getLeechPath(urlLink))
        contents1 = await bakaFunction.getReplaceContentTruyenChu(contents0)

    }

    //Kiem tra validate
    if (contents1) {
        console.log('Chuong ' + tenChapterTruyen + ' ---------> DONE')
        bakaFunction.sendTOBETruyen321(bakaFunction.getLeechPath(urlLink), contents1, tenTruyenGoc, tenChapterTruyen)
    } else {
        console.log(urlLink + ' ---------> TRUYEN KHONG CO NOI DUNG')
    }
    await sleep(500);
    checkOption = false
}

async function leechHentaiManhwa() {
    const patternMwM = /https:\/\/hentaimanhwa.net\/(.*?)\/(.*\$?)\.html/g
    const patternMg18 = /https:\/\/manga18fx.com\/manga\/(.*?)\/chapter-(.*\$?)/g
    let mangaFolder
    let chapterFolder

    let inputLink = readline.question("Nhap Link Manga18fx (Hoac HentaiManhwa): ")
    let listLink = await bakaFunction.getListChapterManga18fx(bakaFunction.getLeechPath(inputLink))
    let replaceLink = listLink.map(fullPath => bakaFunction.getOriginalFullLink(fullPath))

    replaceLink = replaceLink.reverse()
    //console.log(replaceLink)
    //GET CHAPTERS LIST AND WRITE TO TXT FILE
    // fs.writeFileSync(dsLink, replaceLink.join('\n'), function (err) {
    //     if (err) throw err;
    //     console.log('Saved Chapters Link!');
    // });


    await sleep(500);
    for (i in replaceLink) {

        const urlLink = replaceLink[i];

        try {
            //CHECK FOLDER NAME OF MANGA AND CHAPTER
            if (patternMwM.test(urlLink)) {
                mangaFolder = urlLink.replace(patternMwM, '$1')
                chapterFolder = urlLink.replace(patternMwM, '$2')
            } else if (patternMg18.test(urlLink)) {
                mangaFolder = urlLink.replace(patternMg18, '$1')
                chapterFolder = urlLink.replace(patternMg18, 'chapter-$2')
            } else {
                mangaFolder = 'ManhwaManga.Net'
                chapterFolder = crypto.randomBytes(8).toString('hex')
            }
            resultFolder = './' + mangaFolder + '/' + chapterFolder

            
             //NON-DOWNLOAD
             let images = await bakaFunction.getImagesFromUrlManga18fx(bakaFunction.getLeechPath(urlLink))
             let replaceUrls = images.map(srcSet => bakaFunction.getOriginalImageFromSrcSet(srcSet))
             if (replaceUrls) {
                 console.log(urlLink + '---------> DONE')
                 await bakaFunction.sendTOBEHentaiManhwa(bakaFunction.getLeechPath(urlLink), replaceUrls.join('\n'))
             } else {
                 //Khong get duoc image
                 console.log(urlLink + '---------> CANNOT GET IMAGE')
             }

        } catch (error) {
            console.log("Current Link:" + replaceLink[i]);
            return error;
        }
        //removeItemAll(array, urlLink);
        await sleep(1000);
        checkOption = false
    }

}



async function leechAndFixListLink() {
    const patternMwM = /https:\/\/manhwamanga.net\/(.*?)\/(.*\$?)\.html/g
    const patternMg18 = /https:\/\/manga18fx.com\/manga\/(.*?)\/chapter-(.*\$?)/g
    let mangaFolder
    let chapterFolder

    let inputLink = readline.question("Nhap Link Manga18fx (Hoac ManhwaManga): ")
    let isDownload = readline.question("Ban co muon download anh ve server (yes): ")
    let listLink = await bakaFunction.getListChapterManga18fx(bakaFunction.getLeechPath(inputLink))
    let replaceLink = listLink.map(fullPath => bakaFunction.getOriginalFullLink(fullPath))

    replaceLink = replaceLink.reverse()
    //console.log(replaceLink)
    //GET CHAPTERS LIST AND WRITE TO TXT FILE
    // fs.writeFileSync(dsLink, replaceLink.join('\n'), function (err) {
    //     if (err) throw err;
    //     console.log('Saved Chapters Link!');
    // });


    await sleep(500);
    for (i in replaceLink) {

        const urlLink = replaceLink[i];

        try {
            //CHECK FOLDER NAME OF MANGA AND CHAPTER
            if (patternMwM.test(urlLink)) {
                mangaFolder = urlLink.replace(patternMwM, '$1')
                chapterFolder = urlLink.replace(patternMwM, '$2')
            } else if (patternMg18.test(urlLink)) {
                mangaFolder = urlLink.replace(patternMg18, '$1')
                chapterFolder = urlLink.replace(patternMg18, 'chapter-$2')
            } else {
                mangaFolder = 'ManhwaManga.Net'
                chapterFolder = crypto.randomBytes(8).toString('hex')
            }
            resultFolder = './' + mangaFolder + '/' + chapterFolder

            //DOWNLOAD
            if (!checkDirMangaFolder(mangaFolder, chapterFolder)) {
                if (isDownload == 'yes') {
                    if (!fs.existsSync(mangaFolder)) {
                        fs.mkdirSync(mangaFolder)
                    }
                    if (!fs.existsSync(resultFolder)) {
                        fs.mkdirSync(resultFolder)
                        let images = await bakaFunction.getImagesFromUrlManga18fx(bakaFunction.getLeechPath(urlLink))
                        bakaFunction.downloadImage(images, resultFolder);
                        let replaceUrls = images.map(srcSet => bakaFunction.getOriginalImageFromSrcSet(srcSet, resultFolder))
                        if (replaceUrls) {
                            console.log(urlLink + '---------> DONE')
                            bakaFunction.sendTOBEManhwaManga(bakaFunction.getLeechPath(urlLink), replaceUrls.join('\n'))
                            //removeItemAll(array, urlLink);
                        }
                        else {
                            //Khong get duoc image
                            console.log(urlLink + '---------> CANNOT DOWNLOAD IMAGE')
                        }
                    } else {
                        //Neu da download anh ve roi thi hien thong bao da leech
                        console.log(urlLink + '---------> GRABBED')
                    }
                } else {
                    if (fs.existsSync(resultFolder)) {
                        //Neu da download anh ve roi thi hien thong bao da leech
                        console.log(urlLink + '---------> GRABBED')
                    } else {
                        //NON-DOWNLOAD
                        let images = await bakaFunction.getImagesFromUrlManga18fx(bakaFunction.getLeechPath(urlLink))
                        let replaceUrls = images.map(srcSet => bakaFunction.getOriginalImageFromSrcSet(srcSet))
                        if (replaceUrls) {
                            console.log(urlLink + '---------> DONE')
                            await bakaFunction.sendTOBEManhwaManga(bakaFunction.getLeechPath(urlLink), replaceUrls.join('\n'))
                        } else {
                            //Khong get duoc image
                            console.log(urlLink + '---------> CANNOT GET IMAGE')
                        }
                    }
                }
            } else {
                //Neu da upload o cdn5.manhwamanga.net thi se hien thong bao
                console.log(urlLink + '---------> UPLOADED')
            }

        } catch (error) {
            console.log("Current Link:" + replaceLink[i]);
            return error;
        }
        //removeItemAll(array, urlLink);
        await sleep(1000);
        checkOption = false
    }

}



async function downloadManga18fx() {
    const patternMwM = /https:\/\/manhwamanga.net\/(.*?)\/(.*\$?)\.html/g
    const patternMg18 = /https:\/\/manga18fx.com\/manga\/(.*?)\/chapter-(.*\$?)/g

    let urlLink = readline.question("Nhap Link Manga18fx (Hoac ManhwaManga): ")
    let mangaFolder
    let chapterFolder

    //Create result folder
    if (patternMwM.test(urlLink)) {
        mangaFolder = urlLink.replace(patternMwM, '$1')
        chapterFolder = urlLink.replace(patternMwM, '$2')
    } else if (patternMg18.test(urlLink)) {
        mangaFolder = urlLink.replace(patternMg18, '$1')
        chapterFolder = urlLink.replace(patternMg18, 'chapter-$2')
    } else {
        mangaFolder = 'ManhwaManga.Net'
        chapterFolder = crypto.randomBytes(8).toString('hex')
    }
    //let mangaFolder = readline.question("Nhap Ten Manga: ")
    //let chapterFolder = readline.question("Nhap Chapter: ")

    if (!fs.existsSync(mangaFolder)) {
        fs.mkdirSync(mangaFolder)
    }
    resultFolder = './' + mangaFolder + '/' + chapterFolder

    if (!fs.existsSync(resultFolder)) {
        fs.mkdirSync(resultFolder)
    }
    let images = await bakaFunction.getImagesFromUrlManga18fx(bakaFunction.getLeechPath(urlLink))
    bakaFunction.downloadImage(images, resultFolder);
    let replaceUrls = images.map(srcSet => bakaFunction.getOriginalImageFromSrcSet(srcSet, resultFolder))
    uploadToBEManhwaManga(urlLink, replaceUrls)
    checkOption = false
}







async function createNewMangaWordpress() {
    let urlLink = readline.question("Nhap Link Manga18fx: ")
    let images = await bakaFunction.getImagesFromUrlManga18fx(bakaFunction.getLeechPath(urlLink))

    let replaceUrls = images.map(srcSet => bakaFunction.getOriginalImageFromSrcSet(srcSet))
    uploadToBEManhwaManga(urlLink, replaceUrls)
    checkOption = false
}

async function leechManga18fx() {

    let option = readline.question("Chon site muon leech [1]. ManhwaManga - [2]. Hadamanga: ")


    let urlLink = readline.question("Nhap Link Manga18fx: ")
    let images = await bakaFunction.getImagesFromUrlManga18fx(bakaFunction.getLeechPath(urlLink))


    console.log(bakaFunction.getLeechPath(urlLink))
    let replaceUrls = images.map(srcSet => bakaFunction.getOriginalImageFromSrcSet(srcSet))
    const lastItem = replaceUrls[replaceUrls.length - 1]
    lastItem = lastItem.replace('<p><img src="https://cdn6.manhwamanga.net', '')
    lastItem = lastItem.replace('"/></p>', '')

    console.log(lastItem)
    // switch (option) {
    //     case '1':
    //         uploadToBEManhwaManga(urlLink, replaceUrls)
    //         break
    //     case '2':
    //         uploadToBEHadaManga(urlLink, replaceUrls)
    //         break
    //     default:
    //         uploadToBEManhwaManga(urlLink, replaceUrls)
    //         break
    // }

    checkOption = false
}


async function leechChapterListManga18fx() {

    let mangaId = readline.question("Nhap ID truyen goc: ")

    let urlLink = readline.question("Nhap Link Manga18fx: ")

    let listLink = await bakaFunction.getListChapterManga18fx(bakaFunction.getLeechPath(urlLink))
    listLink.forEach((link) => async () => {
        let images = await bakaFunction.getImagesFromUrlManga18fx("https://manga18fx.com/" + link)

        console.log(images)
        let replaceUrls = images.map(srcSet => bakaFunction.getOriginalImageFromSrcSet(srcSet))
        uploadToBEManhwaManga(urlLink, replaceUrls)
        checkOption = false
    })

}

async function leechDocTruyen3Q() {
    let urlLink = readline.question("Nhap Link DocTruyen3Q: ")

    let images = await bakaFunction.getImagesFromUrlDocTruyen3Q(bakaFunction.getLeechPath(urlLink))
    console.log(images)
    let replaceUrls = images.map(srcSet => bakaFunction.getOriginalImageFromSrcSet(srcSet))
    uploadToBEMWManga(urlLink, replaceUrls)
    checkOption = false
}

async function leechMangatuli() {
    let urlLink = readline.question("Nhap Link MangaTuLi: ")

    let images = await bakaFunction.getImagesFromUrlMangaTuLi(bakaFunction.getLeechPath(urlLink))

    let replaceUrls = images.map(srcSet => bakaFunction.getOriginalImageFromSrcSet(srcSet))
    uploadToBEMWManga(urlLink, replaceUrls)
    checkOption = false


}

async function leechSayHentai() {
    let urlLink = readline.question("Nhap Link SayHentai: ")

    let images = await bakaFunction.getImagesFromUrlSayHentai(bakaFunction.getLeechPath(urlLink))

    let replaceUrls = images.map(srcSet => bakaFunction.getOriginalImageFromSrcSet(srcSet))
    uploadToBEMWManga(urlLink, replaceUrls)
    checkOption = false


}

async function leechDuaLeoTruyen() {
    let urlLink = readline.question("Nhap Link DuaLeoTruyen: ")

    let images = await bakaFunction.getImagesFromUrlDuaLeoTruyen(bakaFunction.getLeechPath(urlLink))

    let replaceUrls = images.map(srcSet => bakaFunction.getOriginalImageFromSrcSet(srcSet))
    uploadToBEMWManga(urlLink, replaceUrls)
    checkOption = false
}

async function leechQManga() {
    let urlLink = readline.question("Nhap Link QManga: ")

    let images = await bakaFunction.getImagesFromUrlQManga(bakaFunction.getLeechPath(urlLink))

    let replaceUrls = images.map(srcSet => bakaFunction.getOriginalImageFromSrcSet(srcSet))
    uploadToBEMWManga(urlLink, replaceUrls)
    checkOption = false
}

async function leechTruyenMoiZZ() {
    let urlLink = readline.question("Nhap Link TruyenMoiZZ: ")

    let images = await bakaFunction.getImagesFromUrlTruyenMoiZZ(bakaFunction.getLeechPath(urlLink))

    let replaceUrls = images.map(srcSet => bakaFunction.getOriginalImageFromSrcSet(srcSet))
    uploadToBEMWManga(urlLink, replaceUrls)
    checkOption = false
}

async function leechTruyenVN() {
    let urlLink = readline.question("Nhap Link TruyenVN: ")

    let images = await bakaFunction.getImagesFromUrlTruyenMoiZZ(bakaFunction.getLeechPath(urlLink))

    let replaceUrls = images.map(srcSet => bakaFunction.getOriginalImageFromSrcSet(srcSet))
    uploadToBEMWManga(urlLink, replaceUrls)
    checkOption = false
}

async function leechTruyenTranh86() {
    let urlLink = readline.question("Nhap Link TruyenTranh86: ")

    let images = await bakaFunction.getImagesFromUrlTruyenTranh86(bakaFunction.getLeechPath(urlLink))

    let replaceUrls = images.map(srcSet => bakaFunction.getOriginalImageFromSrcSet(srcSet))
    uploadToBEMWManga(urlLink, replaceUrls)
    checkOption = false
}


async function main() {
    ShowIndex()
}

main()