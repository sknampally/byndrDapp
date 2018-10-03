pragma solidity ^0.4.24;

contract MyLibrary  {
    
    /* Define variable greeting of the type string */
    string public nameOfLibrary;
    address public owner;
    uint16 public totalBookCount;
    uint16 public availableBookCount;
    uint8 public totalMemberCount;
     
     
    struct Book {
        uint16 bookNumber;
        string nameOfBook;
        string author;        
        string genre;
        string date;
        address borrower;
        bool issued;
    }
    Book[] public AllBooksbck;
    mapping (address => uint256) public balanceOf;
    mapping (uint16 => Book) public AllBooks;

    /* This runs when the contract is executed */
    constructor(string _msg) public {
        nameOfLibrary = _msg;
        owner = msg.sender;
    }
    
    function addBook(string _nameOfBook, string _author, string _genre, string _date) public returns (bool _success) {
        require(msg.sender == owner, "Only owner can add books"); 
        // allow only the owner of the library to add books
        Book memory _book;
        totalBookCount++;  
        _book.bookNumber = totalBookCount;
        _book.nameOfBook = _nameOfBook; 
        _book.author = _author;
        _book.genre = _genre;
        _book.date = _date;
        AllBooks[totalBookCount] = _book;
        availableBookCount++;
        return true;
    }

    function joinClub () public payable returns (bool success) {
        if (balanceOf[msg.sender] == 0) {
            totalMemberCount++;
        }
        balanceOf[msg.sender]++;
 
        return true;
    }
    
    function issueBook (uint8 _bookNumber) public returns (bool success){
        require(AllBooks[_bookNumber].borrower == 0x0, "book already issued" );
        // require(balanceOf[msg.sender] >= 2 , "insufficient balance");
        balanceOf[msg.sender] -= 1;
        AllBooks[_bookNumber].borrower = msg.sender;
        AllBooks[_bookNumber].issued = true;
        availableBookCount--;       
        return true;
    }


    function() payable public {
        revert(); // fallback function 
    }
    function finito () public payable {
        selfdestruct(owner);
        
    }

    event ListAllBooks( string _name, string _author); 
    
    function printListOfBooks() public {
        uint8  i;
        for (i = 1 ; i <= totalBookCount; i++ )  { 
            emit ListAllBooks (AllBooks[i].nameOfBook, AllBooks[i].author);
        }
    } 
}