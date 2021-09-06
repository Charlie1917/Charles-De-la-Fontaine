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