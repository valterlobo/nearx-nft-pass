// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Base64.sol";

contract PassType is Ownable {
    constructor(address initialOwner) Ownable(initialOwner) {}

    // ~~~~~~~~~~~~~~~~~~~~ Modifiers ~~~~~~~~~~~~~~~~~~~~
    modifier activePASSType(uint256 id) {
        require(existsPassType(id), "This PASSType does not exist yet, check back later!");
        _;
    }

    error InsufficientSupply(uint256 total, uint256 maxsupply);

    struct PASSInfo {
        string name;
        string description;
        string dateStart;
        string dateEnd;
        string timeStart;
        string timeEnd;
        string instructions;
        string author;
        string image;
        string local;
        string link;
    }

    struct PASSType {
        uint256 id;
        string name;
        string description;
        string image;
        uint256 maxSupply;
        uint256 supply;
        uint256 price;
    }

    struct Property {
        string key;
        string value;
        string p_type;
    }

    mapping(uint256 => PASSType) passTypes;
    mapping(uint256 => Property[]) passPropertys;
    uint256[] indexPassTypes;
    PASSInfo passInfo;

    function setPassInfo(
        string memory nm,
        string memory description,
        string memory dateStart,
        string memory dateEnd,
        string memory timeStart,
        string memory timeEnd,
        string memory instructions,
        string memory author,
        string memory image,
        string memory local,
        string memory link
    ) external onlyOwner {
        passInfo.name = nm;
        passInfo.description = description;
        passInfo.dateStart = dateStart;
        passInfo.dateEnd = dateEnd;
        passInfo.timeStart = timeStart;
        passInfo.timeEnd = timeEnd;
        passInfo.instructions = instructions;
        passInfo.author = author;
        passInfo.image = image;
        passInfo.local = local;
        passInfo.link = link;
    }

    function addPASSType(
        uint256 id,
        string memory nameType,
        string memory descriptionType,
        string memory imageURI,
        uint256 maxSupply,
        uint256 price,
        Property[] memory properties
    ) external onlyOwner {
        require(!existsPassType(id), "This PASSType EXIST [ID]");

        PASSType memory newPassType = PASSType(id, nameType, descriptionType, imageURI, maxSupply, 0, price);

        passTypes[id] = newPassType;

        for (uint256 index = 0; index < properties.length; index++) {
            Property memory p = properties[index];
            passPropertys[id].push(p);
        }

        indexPassTypes.push(id);
    }

    function getMetadatas(uint256 id) public view returns (Property[] memory) {
        require(existsPassType(id), "This PASSType does not exist yet, check back later!");
        return passPropertys[id];
    }

    function getPASSType(uint256 id) public view returns (PASSType memory) {
        require(existsPassType(id), "This PASSType does not exist yet, check back later!");
        return passTypes[id];
    }

    function getIndexPASSTypes() public view returns (uint256[] memory) {
        return indexPassTypes;
    }

    function getPASSInfo() public view returns (PASSInfo memory) {
        return passInfo;
    }

    function getPassInfoJSON() public view returns (string memory) {
        bytes memory metadata = "{";

        bytes memory metadataParcial;

        metadataParcial = abi.encodePacked('"', "name", '": "', passInfo.name, '",');
        metadata = abi.encodePacked(metadata, metadataParcial);

        metadataParcial = abi.encodePacked('"', "description", '": "', passInfo.description, '",');
        metadata = abi.encodePacked(metadata, metadataParcial);

        metadataParcial = abi.encodePacked('"', "dateStart", '": "', passInfo.dateStart, '",');
        metadata = abi.encodePacked(metadata, metadataParcial);

        metadataParcial = abi.encodePacked('"', "dateEnd", '": "', passInfo.dateEnd, '",');
        metadata = abi.encodePacked(metadata, metadataParcial);

        metadataParcial = abi.encodePacked('"', "timeStart", '": "', passInfo.timeStart, '",');
        metadata = abi.encodePacked(metadata, metadataParcial);

        metadataParcial = abi.encodePacked('"', "author", '": "', passInfo.author, '",');
        metadata = abi.encodePacked(metadata, metadataParcial);

        metadataParcial = abi.encodePacked('"', "instructions", '": "', passInfo.instructions, '",');
        metadata = abi.encodePacked(metadata, metadataParcial);

        metadataParcial = abi.encodePacked('"', "image", '": "', passInfo.image, '",');
        metadata = abi.encodePacked(metadata, metadataParcial);

        metadataParcial = abi.encodePacked('"', "local", '": "', passInfo.local, '",');
        metadata = abi.encodePacked(metadata, metadataParcial);

        metadataParcial = abi.encodePacked('"', "link", '": "', passInfo.link, '"');
        metadata = abi.encodePacked(metadata, metadataParcial);

        metadata = abi.encodePacked(metadata, " }");

        string memory attributes64 = Base64.encode(metadata);
        return string(abi.encodePacked("data:application/json;base64,", attributes64));
    }

    function getPassTypeJSON(uint256 id) public view returns (string memory) {
        bytes memory metadata = "{";

        bytes memory metadataParcial;

        PASSType memory pType = passTypes[id];

        metadataParcial = abi.encodePacked('"', "name", '": "', pType.name, '",');
        metadata = abi.encodePacked(metadata, metadataParcial);

        metadataParcial = abi.encodePacked('"', "description", '": "', pType.description, '",');
        metadata = abi.encodePacked(metadata, metadataParcial);

        metadataParcial = abi.encodePacked('"', "image", '": "', pType.image, '",');
        metadata = abi.encodePacked(metadata, metadataParcial);

        metadata = abi.encodePacked(metadata, '"attributes": [');

        PassType.Property[] memory props = passPropertys[id];
        uint256 idx = props.length;
        for (uint256 index = 0; index < props.length; index++) {
            Property memory p = props[index];
            metadata = abi.encodePacked(metadata, "{");

            metadataParcial = abi.encodePacked('"', "key", '": "', p.key, '",');
            metadata = abi.encodePacked(metadata, metadataParcial);

            metadataParcial = abi.encodePacked('"', "trait_type", '": "', p.p_type, '",');
            metadata = abi.encodePacked(metadata, metadataParcial);

            metadataParcial = abi.encodePacked('"', "value", '": "', p.value, '"');
            metadata = abi.encodePacked(metadata, metadataParcial);
            metadata = abi.encodePacked(metadata, "}");

            if (index < idx - 1) {
                metadata = abi.encodePacked(metadata, ",");
            }
        }
        metadata = abi.encodePacked(metadata, " ] }");
        string memory attributes64 = Base64.encode(metadata);
        return string(abi.encodePacked("data:application/json;base64,", attributes64));
    }

    function existsPassType(uint256 id) internal view virtual returns (bool) {
        return passTypes[id].id != 0;
    }
}
