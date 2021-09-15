   # "NFTs paradise"
 
   NFTs paradise เป็น Dapp แบบเว็บแอพพลิเคชั่น ในการจองสิทธิ์ที่จะเข้าร่วมประมูล NFTs ไฟล์เพลงและภาพ  ของศิลปินชื่อดังทั้งไทยและต่างประเทศ ซึ่งในที่นี้มี 16 ชิ้น 
   
   [![NFTs-paradise-Google-Chrome-9-15-2021-4-49-54-PM.png](https://i.postimg.cc/L4tGKLgy/NFTs-paradise-Google-Chrome-9-15-2021-4-49-54-PM.png)](https://postimg.cc/nML3qsk7)
   
   ซึ่งการจองสิทธิ์นี้ก็เพื่อไม่ให้พลาดการเป็นเจ้าของ โดย NFT แต่ละชิ้น จะแจ้งวันที่จะประมูลให้ทราบ  หากไม่จองไว้ภายในวันที่กำหนด (ซึ่งไม่ได้เขียนโค้ดตรงนี้ไว้ เนื่องจากยังไม่มีความรู้) จะไม่มีสิทธิ์ที่จะเข้าประมูลชิ้นงานดังกล่าว
   
   [![NFTs-paradise-Google-Chrome-9-15-2021-4-50-21-PM.png](https://i.postimg.cc/vZxZv0Dq/NFTs-paradise-Google-Chrome-9-15-2021-4-50-21-PM.png)](https://postimg.cc/cvZWxMRw)

## ภาพรวมการทำงานของ Dapp
Dapp นี้ สรุปได้ว่า เราใช้ Smart contract ที่เขียนโดยภาษา Solidity ซึ่งเรา deploy บนบล็อกเชนส่วนบุคคล Ganache ไปเชื่อมต่อกับ Front-end และ back-end บน visual studio code เพื่อให้แสดงผลออกมาเป็นเว็บไซต์จองสิทธิ์ประมูล ซึ่งจะมีไฟล์ที่สำคัญดังต่อไปนี้ 

  **1.Booking.sol**
  
  **2.index.html**
  
  **3.app.js**
  
  **4.Nfts.json**

## 1. สร้าง Smart Contract
### 1.1. Booking Smart Contract

สร้าง Smart contract โดยเปิด Visual Studio Code ให้นำเคอร์เซอร์วางเหนือโฟลเดอร์ ```contracts``` แล้วคลิกขวาไปที่ ```New file``` และสร้างไฟล์ชื่อ ```Booking.sol``` โดยมีโค้ดดังนี้

```
//"SPDX-License-Identifier:MIT"
pragma solidity ^0.5.16;

contract Booking {
    address[16] public Bookers;

    function Reserve(uint nftID) public returns (uint) {
        require(nftID >= 0 && nftID <=15);
        Bookers[nftID] = msg.sender;
        return nftID;
    }

    function getBookers() public view returns (address[16] memory) {
        return Bookers;
    }
}

```
จากโค้ด ใน contract นี้จะมี 2 function ได้แก่ Reserve ซึ่งเก็บค่าและคืนค่า Nft (nftId)  และ function getBookers ซึ่งเป็นการเรียกดูข้อมูลและคืนค่าผู้จอง( Bookers)  

### 1.2 compile 
---------
ลำดับต่อไปให้ทำการคอมไฟล์ Smart Contract เพื่อให้เป็นภาษาที่เครื่องเข้าใจ โดยใช้คำสั่งใน terminal ดังนี้

```
truffle compile
```

โดยจะมีข้อความเช่นนี้หรือคล้ายกัน ปรากฎขึ้นมา

[![booking-sol-NFT-version3-Workspace-Visual-Studio-Code-9-15-2021-4-34-05-PM.png](https://i.postimg.cc/L5YBbPTv/booking-sol-NFT-version3-Workspace-Visual-Studio-Code-9-15-2021-4-34-05-PM.png)](https://postimg.cc/rRTrdK7t)

จากนั้นใน **Visual Studio Code** ให้นำเคอร์เซอร์วางเหนือโฟลเดอร์ ```migrations``` แล้วคลิกขวาไปที่ ```New file``` แล้วสร้างไฟล์ชื่อ ```2_deploy_contracts.js``` แล้วเขียนโค้ดดังนี้

```
var Booking = artifacts.require("Booking");

module.exports = function(deployer) {
  deployer.deploy(Booking);
};
```

จากนั้นเปิด Ganache ขึ้นมา จะปรากฎ การแสดง account บน ganache ต่างๆ ตามภาพ

[![ganache3.png](https://i.postimg.cc/85V489Cw/ganache3.png)](https://postimg.cc/f3BmmHm0)

### 1.3 Migrate
---------
ในขั้นตอนต่อไปให้ทำการ **migrate** Smart contract ไปอยู่บน _**personal blockchain**_ ซึ่งในที่นี้คือ **ganache** ทำได้โดยใช้คำสั่งใน **terminal** ดังต่อไปนี้

```
truffle migrate
```
หาก **migrate** ผ่าน จะปรากฎข้อความลักษณะดังกล่าว ซึ่งเป็นการอ่าน ไฟล์ ```Booking.sol,1_initial_migration.js``` และ ```2_deploy_contracts.js```ซึ่งระบบจะนำข้อมูลไปไว้บนบล็อคเชน และคำนวณค่า gas ซึ่งมีหน่วยเป็น _**Wei**_ ,_**Gwei**_ และ _**Ether**_ ตามลำดับ

```
Compiling your contracts...
===========================
> Everything is up to date, there is nothing to compile.



Starting migrations...
======================
> Network name:    'development'
> Network id:      5777
> Block gas limit: 6721975 (0x6691b7)


1_initial_migration.js
======================

   Deploying 'Migrations'
   ----------------------
   > transaction hash:    0xc6c26d00c1a2389cf091b21acfbf8c6d49792b855738849bb3c0ea9381da3fab   > Blocks: 0            Seconds: 0
   > contract address:    0xBAD797B409700E05374664CAd548f20F3a47b84F
   > block number:        18
   > block timestamp:     1610204710
   > account:             0xd797cb4efB9759A907E7849a454fEE2D9ba059EF
   > balance:             99.97105016
   > gas used:            191943 (0x2edc7)
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.00383886 ETH


   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:          0.00383886 ETH


2_deploy_contracts.js
=====================

   Deploying 'Booking'
   --------------------
   > transaction hash:    0x5fd4693613601e09253f91a33fd5abe31bc469f2f7a00360c87be5854d00caa4   > Blocks: 0            Seconds: 0
   > contract address:    0xA7621957B4A66C341a56Fd82b5f1eA93EC9859D1
   > block number:        20
   > block timestamp:     1610204711
   > account:             0xd797cb4efB9759A907E7849a454fEE2D9ba059EF
   > balance:             99.96612686
   > gas used:            203827 (0x31c33)
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.00407654 ETH


   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:          0.00407654 ETH


Summary
=======
> Total deployments:   2
> Final cost:          0.0079154 ETH

```

## 2.รูปแบบเว็บไซต์ ( User Interface :UI) ซึ่งเป็น front end เพื่อใช้เชื่อมต่อกับผู้ใช้
รูปลักษณ์ของเว็บแอพพลิเคชั่นที่ออกแบบมีลักษณะ ดังนี้ 
[![NFTs-paradise-Google-Chrome-9-15-2021-4-49-54-PM.png](https://i.postimg.cc/L4tGKLgy/NFTs-paradise-Google-Chrome-9-15-2021-4-49-54-PM.png)](https://postimg.cc/nML3qsk7)

รูปลักษณ์ตามที่เห็นนี้เป็นการสร้างไฟล์```index.html``` , ```app.js``` และ ```Nfts.json``` โดยเริ่มที่ **front end** คือไฟล์ ```index.html```ให้เปิด **Visual Studio Code** ไปที่ ```src/index.html``` โดยให้มีโค้ด ดังนี้ 

```<!DOCTYPE html>
<html lang="en">
     <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
     <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
     <!-- Include all compiled plugins (below), or include individual files as needed -->
     <script src="js/bootstrap.min.js"></script>
     <script src="js/web3.min.js"></script>
     <script src="js/truffle-contract.js"></script>
     <script src="js/app.js"></script>

  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <title>NFTs paradise</title>

    <!-- Bootstrap -->
    <link href="css/bootstrap.min.css" rel="stylesheet">

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>
  <body background="https://cdn.pixabay.com/photo/2016/06/02/02/33/triangles-1430105_1280.png">
    
    <div class="container">
      <div class="row">
        <div class="col-12 text-center">
          <h1
          style="font-size: 60px; 
                color: rgb(26, 20, 114);
                font-family: Verdana, Geneva, Tahoma, sans-serif;
                border: 10px rgb(218, 4, 4); 
                border-style: double; 
                background-color: white;" 
          class="text-center">
            <b>NFTs Paradise</b></h1>
          <hr/>
          <p style="font-size: 30px; 
          color: rgb(70, 121, 12);
          font-family: Verdana, Geneva, Tahoma, sans-serif;
          border: 10px rgb(218, 4, 4); 
          background-color: white;" >Reserve Your Chance Now!</p>
        </div>
      </div>
      <div id="nftsRow" class="row">
        <!-- NFTs LOAD HERE -->
      </div>
    </div>

   <center> <div id="NftsTemplate" style="display:none;">
      <div class="col-sm-4 col-md-4 col-lg-3">
        <div class="panel panel-default panel-nft">
          <div class="panel-heading">
      
              </script>
            <h3 class="panel-title"><center>Brand</center></h3>
          </div>
          <div class="panel-body">
            <img alt="140x140" data-src="holder.js/140x140" class="img-rounded img-center" style="width: 100%;" src="http://localhost:3000/images/Altis.jpeg" data-holder-rendered="true">
            <br/><br/>
            <strong>ชื่อศิลปิน</strong>: <span class="nft-Maker">X</span><br/>
            <strong>ราคาเริ่มต้น</strong>: <span class="nft-Start">1</span><br/>
            <strong>วันประมูล</strong>: <span class="nft-Date">D - D</span><br/><br/>
            <center><button class="btn btn-default btn-Reserve" type="button" data-id="0">ร่วมประมูล</button></center>
          </div>
        </div>
      </div>
    </div></center>

 
  </body>
</html>
```

จากโค้ด **บรรทัดที่ 20-47**  เป็นการปรับแต่งพื้นหลัง สร้างกรอบข้อความรอบชื่อแอพพลิเคชั่น และใช้สีของตัวหนังสือที่ต่างๆ กันไป 

ส่วนโค้ด**บรรทัดที่ 55-69** เดิมเป็นการสร้างเทมเพลตเบื้องต้นจากต้นฉบับ(แสดงข้อมูลของเว็บไซต์รถยนต์ )ในที่นี้เราดัดแปลงมาเป็นการจอง Nft  โดยเปลี่ยนข้อความเป็นภาษาไทยตามภาพ ทั้งหัวข้อ ศิลปิน ราคาเริ่มต้น วันเริ่มประมูล และชื่อปุ่มกด

## 3. สร้าง Backend ที่สามารถเชื่อมต่อกับ Smart Contract
#### 3.1 ให้สร้างไฟล์ ```src/js/app.js``` ใน visual studio code ให้มีโค้ดดังนี้

```
App = {
  web3Provider: null,
  contracts: {},

  init: async function() {
    // Load Nfts.
    $.getJSON('../Nfts.json', function(data) {
      var nftsRow = $('#nftsRow');
      var NftsTemplate = $('#NftsTemplate');

      for (i = 0; i < data.length; i ++) {
        NftsTemplate.find('.panel-title').text(data[i].name);
        NftsTemplate.find('img').attr('src', data[i].picture);
        NftsTemplate.find('.nft-Start').text(data[i].ราคาเริ่มต้น);
        NftsTemplate.find('.nft-Maker').text(data[i].ชื่อศิลปิน);
        NftsTemplate.find('.nft-Date').text(data[i].วันประมูล);
        NftsTemplate.find('.btn-Reserve').attr('data-id', data[i].id);

        nftsRow.append(NftsTemplate.html());
      }
    });

    return await App.initWeb3();
  },

  initWeb3: async function() {
    // Modern dapp browsers...
    if (window.ethereum) {
      App.web3Provider = window.ethereum;
      try {
        // Request account access
        await window.ethereum.enable();
      } catch (error) {
        // User denied account access...
        console.error("User denied account access")
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      App.web3Provider = window.web3.currentProvider;
    }
    // If no injected web3 instance is detected, fall back to Ganache
    else {
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
    }
    web3 = new Web3(App.web3Provider);

    return App.initContract();
  },

  initContract: function() {
    $.getJSON('Booking.json', function (data) {
      // Get the necessary contract artifact file and instantiate it with @truffle/contract
      var BookingArtifact = data;
      App.contracts.Booking = TruffleContract(BookingArtifact);

      // Set the provider for our contract
      App.contracts.Booking.setProvider(App.web3Provider);

      // Use our contract to retrieve and mark the Reserved nfts
      return App.markReserved();
    });
    return App.bindEvents();
  },

  bindEvents: function() {
    $(document).on('click', '.btn-Reserve', App.handleReserve);
  },

  markReserved: function() {
    var BookingInstance;

    App.contracts.Booking.deployed().then(function (instance) {
      BookingInstance = instance;

      return BookingInstance.getBookers.call();
    }).then(function (Bookers) {
      for (i = 0; i < Bookers.length; i++) {
        if (Bookers[i] !== '0x0000000000000000000000000000000000000000') {
          $('.panel-nft').eq(i).find('button').text('Reserved').attr('disabled', true);
        }
      }
    }).catch(function (err) {
      console.log(err.message);
    });
  },

  handleReserve: function(event) {
    event.preventDefault();

    var nftID = parseInt($(event.target).data('id'));

    var BookingInstance;

    web3.eth.getAccounts(function (error, accounts) {
      if (error) {
        console.log(error);
      }

      var account = accounts[0];

      App.contracts.Booking.deployed().then(function (instance) {
        BookingInstance = instance;

        // Execute Reserve as a transaction by sending account
        return BookingInstance.Reserve(nftID, { from: account });
      }).then(function (result) {
        return App.markReserved();
      }).catch(function (err) {
        console.log(err.message);
      });
    });
  }

};

$(function() {
  $(window).load(function() {
    App.init();
  });
})


```
[![1-26.png](https://i.postimg.cc/ydKJ0ZJ2/1-26.png)](https://postimg.cc/XZ27bXkg)

**บรรทัดที่ 7-19**  เป็นการดึงข้อมูลจาก ```Nfts.json``` ซึ่งบรรจุข้อมูลของ nft ทั้ง 16 ชิ้น มาใช้ในฟังก์ชั่น For loop ซึ่งสั่งให้โปรแกรมค้นหาข้อมูลเรียงตาม ```nftId``` ตั้งแต่ชิ้นแรกคือ id 0 จนถึง id 15 แล้วนำไปแสดงผลเชื่อมกับ ```NftTemplate``` ซึ่งเป็นเทมเพลตที่สร้างไว้ใน ```index.html```

[![26-48.png](https://i.postimg.cc/yNp183mF/26-48.png)](https://postimg.cc/7C78B6Q6)

**บรรทัดที่ 26-46** เป็นการระบุว่าจะใช้ web3 (บล็อกเชน) แบบใดในการเชื่อมต่อกับ smart contract โดยเริ่มจาก Metamask ,Legacy browser และ Ganache ตามลำดับ หากต้องการใช้เฉพาะอันใดอันหนึ่งก็ให้ทำการ comment บรรทัดที่เหลือ  

[![app-js-NFT-version3-Workspace-Visual-Studio-Code-9-15-2021-5-45-26-PM.png](https://i.postimg.cc/0jSKm1P2/app-js-NFT-version3-Workspace-Visual-Studio-Code-9-15-2021-5-45-26-PM.png)](https://postimg.cc/hQSGWwXH)

**บรรทัดที่ 70-84**  เป็นการดึงเอา smart contract มาใช้ โดยสั่งการให้โปรแกรมเชื่อม wallet address เมื่อมีการกดปุ่ม "รับอุปการะ" Metamask/Ganache จะทำการคิดค่า gas ทันที และ frond end จะแสดงผลโดยเปลี่ยนปุ่ม "รับอุปการะ" เป็น "อุปการะแล้ว" เพื่อให้ผู้ใจบุญท่านอื่นทราบ และเลือกเด็กที่เหลือต่อไป
โดย **บรรทัดที่ 70** ประกาศฟังก์ชั่น ```markAdopted``` **บรรทัดที่ 71** ประกาศตัวแปร  ```adoptionInstance```  

**บรรทัดที่ 73-74**  เป็นการตรวจสอบว่า ```Adoption.sol``` ได้รับการ deploy แล้วหรือไม่ ถ้าเรียบร้อยแล้ว ให้ทำฟังก์ชั่น Instance ต่อ โดยนำค่าตัวแปร ``` instance```  ซึ่ง ณ ตอนนี้มีค่าเท่ากับ```Adoption.sol ที่ deploy แล้ว``` ไปใส่ไว้ใน ```adoptionInstance``` 

**บรรทัดที่ 76-77** เมื่อ function ```getAdopters``` ทำงานแล้ว ให้นำพารามิเตอร์ที่ได้ไปให้กับ function ```adopters``` ซึ่งจะทำงานต่อใน**บรรทัดที่ 78-80**   
**บรรทัดที่ 78-80**  เป็น function ```For loop``` ซึ่งนำเอาข้อมูลเด็กทั้ง 16 จากบล็อกเชนมาเชื่อมต่อกับ back end คือ ```app.js```  แปลความได้ว่า **เมื่อมีผู้อุปการะแล้วให้เปลี่ยนปุ่ม "รับอุปการะ" เป็น "อุปการะแล้ว"** ซึ่งก่อนจะจบ function ```markAdopted``` ให้ย้อนไปทำ function  ```bindEvents``` ใน**บรรทัดที่ 66** ก่อน 

[![app-js-NFT-version3-Workspace-Visual-Studio-Code-9-15-2021-5-11-45-PM.png](https://i.postimg.cc/P5P8HD8k/app-js-NFT-version3-Workspace-Visual-Studio-Code-9-15-2021-5-11-45-PM.png)](https://postimg.cc/0z1Ndbft)
จาก function  ```bindEvents``` ใน**บรรทัดที่ 66** เป็นการสั่งว่า เมื่อมีการคลิกที่ ```btn-adopt``` ซึ่งก็คือปุ่ม **"รับอุปการะ"** ให้ไปทำ function  ```handleAdopt ``` ใน**บรรทัดที่ 88**  
[![app-js-NFT-version3-Workspace-Visual-Studio-Code-9-15-2021-5-11-59-PM.png](https://i.postimg.cc/MZ5cj57S/app-js-NFT-version3-Workspace-Visual-Studio-Code-9-15-2021-5-11-59-PM.png)](https://postimg.cc/Lhq4czQC)
**บรรทัดที่ 89** หมายถึง function นี้ เราไม่ต้อง submit ลงไปในแอพพลิเคชั่น (ในเว็บนี้) ,เราต้องการที่จะจัดการ ( handle)  ด้วยตัวเอง  
**บรรทัดที่ 95-97** เป็นการอ่านค่า account บน web3 ( Ganache) หากอ่านค่าไม่ได้ให้แสดงผล error ออกมาทาง console 
[![app-js-NFT-version3-Workspace-Visual-Studio-Code-9-15-2021-5-12-14-PM.png](https://i.postimg.cc/BnKQNBKt/app-js-NFT-version3-Workspace-Visual-Studio-Code-9-15-2021-5-12-14-PM.png)](https://postimg.cc/bZqhwbLj)
**บรรทัดที่ 100-103** เป็นการประกาศตัวแปรชื่อ ```account```  ให้มีค่าเริ่มต้นเป็น account เบอร์ 0 จากนั้นให้ทำ function เช่นเดียวกับ **บรรทัดที่ 73-74** 
**บรรทัดที่ 106-108** เป็นการให้ ```adoptionInstance``` ซึ่งตอนนี้มีค่าเท่ากับ ```Adoption.sol``` อ่านค่า function ```adopt``` ตามด้วย ```kidId``` ตามด้วย ```account``` จะได้ค่า ```kidId``` ออกมา ให้นำไปไว้ใน function ```result``` (ซึ่งค่าใน result หลังจากนี้ ไม่ได้ใช้ทำอะไรต่อ) จากนั้นให้วนไปทำ function ```markAdopted``` ใน**บรรทัดที่ 70-84** ตามที่ได้กล่าวมาแล้ว  


### 4.2 สร้างไฟล์ .json ซึ่งเป็นฐานข้อมูลของ Nfts ทั้ง 16 ชิ้น
---------
โดยไปที่โฟลเดอร์ ```src``` แล้วสร้าง  ```New file``` ชื่อ ```Nfts.json``` โดยให้มีโค้ด ดังต่อไปนี้
```
   [
    {
      "id": 0,
      "name": "Dream on",
      "picture": "images/0.png",
      "ราคาเริ่มต้น": 0.0001,
      "ชื่อศิลปิน": "Aerosmith",
      "วันประมูล": "19 ก.ย.64"
    },
    {
      "id": 1,
      "name": "Cyclone",
      "picture": "images/1.jpg",
      "ราคาเริ่มต้น": 1,
      "ชื่อศิลปิน": "Sticky fingers",
      "วันประมูล": "20 ก.ย.64"
    },
    {
      "id": 2,
      "name": "Wait and bleed",
      "picture": "images/2.jpg",
      "ราคาเริ่มต้น": 0.5,
      "ชื่อศิลปิน": "Slipknot",
      "วันประมูล": "6 ก.ย.64"
    },
    {
      "id": 3,
      "name": "Sickness",
      "picture": "images/3.jpg",
      "ราคาเริ่มต้น": 0.002,
      "ชื่อศิลปิน": "Disturbed",
      "วันประมูล": "12 ก.ย.64"
    },
    {
      "id": 4,
      "name": "My way",
      "picture": "images/4.jpg",
      "ราคาเริ่มต้น": 0.008,
      "ชื่อศิลปิน": "Limp Bizkit",
      "วันประมูล": "1 ต.ค.64"
    },
    {
       "id": 5,
       "name": "The Alien",
       "picture": "images/5.jpg",
       "ราคาเริ่มต้น": 0.009,
       "ชื่อศิลปิน": "Dream Theatre",
       "วันประมูล": "18 ก.ย.64"
    },
    {
      "id": 6,
      "name": "คู่คอง",
      "picture": "images/6.jpg",
      "ราคาเริ่มต้น": 0.0004,
      "ชื่อศิลปิน": "ก้อง ห้วยไร่",
      "วันประมูล": "20 ก.ย.64"
    },
    {
      "id": 7,
      "name": "Kashmir",
      "picture": "images/7.jpg",
      "ราคาเริ่มต้น": 0.00045,
      "ชื่อศิลปิน": "Led Zeppelin",
      "วันประมูล": "15 ก.ย.64"
    },
    {
      "id": 8,
      "name": "7 nations army",
      "picture": "images/8.jpg",
      "ราคาเริ่มต้น": 0.00009,
      "ชื่อศิลปิน": "The White Stripes",
      "วันประมูล": "16 ก.ย.64"
    },
    {
      "id": 9,
      "name": "โกหก",
      "picture": "images/9.jpg",
      "ราคาเริ่มต้น": 2,
      "ชื่อศิลปิน": "Tattoo Colour",
      "วันประมูล": "15 ก.ย.64"
    },
    {
      "id": 10,
      "name": "Good things fall apart",
      "picture": "images/10.jpg",
      "ราคาเริ่มต้น": 0.00004,
      "ชื่อศิลปิน": "Illenium",
      "วันประมูล": "16 ก.ย.64"
    },
    {
      "id": 11,
      "name": "Just a moment",
      "picture": "images/11.jpg",
      "ราคาเริ่มต้น": 0.0007,
      "ชื่อศิลปิน": "Gryffin",
      "วันประมูล": "2 ก.ย.64"
    },
    {
      "id": 12,
      "name": "Enter sandman",
      "picture": "images/12.jpg",
      "ราคาเริ่มต้น": 0.00003,
      "ชื่อศิลปิน": "Metallica",
      "วันประมูล": "15 ก.ย.64"
    },
    {
      "id": 13,
      "name": "Bohemian Rhapsody",
      "picture": "images/13.png",
      "ราคาเริ่มต้น": 1,
      "ชื่อศิลปิน": "Queen",
      "วันประมูล": "17 ก.ย.64"
    },
    {
      "id": 14,
      "name": "Hero",
      "picture": "images/14.jpg",
      "ราคาเริ่มต้น": 0.0008,
      "ชื่อศิลปิน": "Alesso",
      "วันประมูล": "2 ต.ค.64"
    },
    {
      "id": 15,
      "name": "The day",
      "picture": "images/15.png",
      "ราคาเริ่มต้น": 0.00004,
      "ชื่อศิลปิน": "Avicii",
      "วันประมูล": "1 ต.ค.64"
    }
  ]
  ```

## 5. การทำงานของโปรแกรม 

ให้รันโปรแกรม โดยใช้คำสั่งใน terminal ดังนี้ 

```
npm run dev
```

-จากนั้น Web browser จะเปิดหน้าเว็บแอพพลิเคชั่นขึ้นมาที่ URL  ```http://localhost:3000```

-จะเห็นได้ว่า ก่อนที่จะมีการจอง ปุ่มด้านล่างกล่องข้อมูลของ Nft แต่ละชิ้นจะขึ้นว่า **"ร่วมประมูล"** เป็นตัวหนังสือ**สีเข้ม**อยู่ 

[![NFTs-paradise-Google-Chrome-9-15-2021-4-49-54-PM.png](https://i.postimg.cc/L4tGKLgy/NFTs-paradise-Google-Chrome-9-15-2021-4-49-54-PM.png)](https://postimg.cc/nML3qsk7)

-เมื่อมีการกดจองสิทธิ์แล้ว ปุ่มด้านล่างกล่องข้อมูลจะเปลี่ยนเป็น ```"Reserved" ```เป็นตัวหนังสือสี```จาง```แทน

[![NFTs-paradise-Google-Chrome-9-15-2021-10-11-58-PM.png](https://i.postimg.cc/NfMh6LLp/NFTs-paradise-Google-Chrome-9-15-2021-10-11-58-PM.png)](https://postimg.cc/grfBdzVZ)

-**Ganache** จะอัพเดทยอดเงินหลังหักค่า gas ถือว่าการทำงานสมบูรณ์ 🙂

[![Ganache-9-15-2021-10-15-44-PM.png](https://i.postimg.cc/HkghSxkq/Ganache-9-15-2021-10-15-44-PM.png)](https://postimg.cc/qz1wqpnw)


         

