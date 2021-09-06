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