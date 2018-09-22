    showloading();
    window.addEventListener("load", () => {
      var checklist = {};
      checklist.isMetaMaskInstalled = false;
      checklist.isLargeDevice = false;
      checklist.isLoggedIn = false;
      checklist.isSupportedNetwork = false;
      checklist.networkId = 0;

/* Code For checking width compatibility */

  if ($(window).width() > 900) {
        checklist.isLargeDevice = true;
      }

if (typeof web3 !== "undefined") {
    if (!web3.currentProvider.isMetaMask) {

        console.log('Meta Mask Not loggedIn');
        // do nothing
    } else {
        checklist.isMetaMaskInstalled = true;
        web3 = new Web3(web3.currentProvider);

        if (web3.eth.accounts.length != 0) {
          checklist.isLoggedIn = true; 
          console.log('Working Great');
        }
        
        var netId = web3.version.network;
        checklist.networkId = netId;
        if (netId === "1" || netId === "42" || netId === "3") {
          checklist.isSupportedNetwork = true;
        }
    }
  }
/* Code For checking Login to meta mask */
   
/* main code starts from here*/

      var checklistContainer = `
      <div class="row">
        <div class="col-lg-12">
            <div class="hpanel panel-group hbyndr" style="min-height: 200px;">
                <div class="panel-body">
                  <div class="m-b-lg text-center">
                      <h2 class="m-b-sm">Byndr | Dapp </h4>
                      <p>Welcome, checklist to get you started</p>
                  </div>
                  <!-- <div class="m-b-lg">
                      <div class="pull-right text-right">
                          <h3><i class="fa fa-check-circle ${isValid(checklist.isLargeDevice)}"></i></h3>
                      </div>
                      <h4 class="m-b-xxs">Desktop &amp; Laptop support</h4>
                      <p class="small">Mobile and tablets not supported</p>
                  </div> -->
                  <div class="m-b-lg">
                    <div class="pull-right text-right">
                        <h3><i class="fa fa-check-circle ${isValid(checklist.isMetaMaskInstalled)}"></i></h3>
                    </div>
                    <h4 class="m-b-xxs">Install MetaMask</h4>
                    <p class="small">Click <a href="https://metamask.io/" class="text-byndr" target="_blank">here</a> to install</p>
                  </div>
                  <div class="m-b-lg">
                    <div class="pull-right text-right">
                        <h3><i class="fa fa-check-circle ${isValid(checklist.isLoggedIn)}"></i></h3>
                    </div>
                    <h4 class="m-b-xxs">Login to MetaMask</h4>
                    <p class="small">Unlock your account to start using app</p>
                  </div>
                  <div class="m-b-lg">
                      <h4 class="m-b-xxs">Connect to supported network</h4>
                      <p class="small m-b-sm">Please connect to any one of the following networks on MetaMask</p>
                      <div>
                          <div class="pull-right text-right">
                              <h5><i class="fa fa-check-circle ${isValid(checklist.isSupportedNetwork && checklist.networkId === "1")}"></i></h5>
                          </div>
                          <p class="m-b-sm">Mainnet<span class="small"> (live)</span></p>
                      </div>
                      <div>
                          <div class="pull-right text-right">
                              <h5><i class="fa fa-check-circle ${isValid(checklist.isSupportedNetwork && checklist.networkId === "42")}"></i></h5>
                          </div>
                          <p class="m-b-sm">Kovan<span class="small"> (test)</span></p>
                      </div>
                      <div>
                          <div class="pull-right text-right">
                              <h5><i class="fa fa-check-circle ${isValid(checklist.isSupportedNetwork && checklist.networkId === "3")}"></i></h5>
                          </div>
                          <p class="m-b-sm">Ropsten<span class="small"> (test)</span></p>
                      </div>
                  </div>
                  <div class="m-b-sm">
                    <div style="margin: 0 auto;display: table;">
                        <a id="launch">
                          <button id="launchButton" class="btn btn-lg">
                            Launch
                          </button>
                        </a>
                        <a href="./" style="margin-left:10px;">
                          <button class="btn btn-success btn-outline btn-lg">
                            Reload
                          </button>
                        </a>
                    </div>
                  </div>
                </div>
            </div>
        </div>
      </div>
      `;
      
      $(".register-container").append(checklistContainer);
      $("#launchButton").prop("disabled", true); 
      
      $("#launchButton").css("background-color", "rgb(106, 108, 111)"); 
      $("#launchButton").css("border-color", "rgb(106, 108, 111)"); 
      $("#launchButton").css("color", "#fff"); 

      if (checklist.isMetaMaskInstalled && 
          checklist.isLargeDevice &&
          checklist.isLoggedIn &&
          checklist.isSupportedNetwork) {
          $("#launchButton").css("background-color", "#c42074"); 
          $("#launchButton").css("border-color", "#c42074"); 
          $("#launchButton").css("color", "#fff"); 

          $("#launchButton").prop("disabled", false);
          $("#launch").prop("href", "./dashboard");
          
          // setTimeout(() => {
          //   $(location).attr('href',"loans.html");
          // }, 5000);

          //$(location).attr('href',"loans.html");
      }
    
      stopLoading();
      
      $(window).resize(function(){
          performPageReload();
      });
    });

    function isValid(check) {
      if (check) {
        return "text-byndr";
      } else {
        return "text-muted";
      }
    }  

function performPageReload() {
  location.reload(!0);
}

function showloading() {
  $('#loader').css('display','block');
}

function stopLoading() {
  $('#loader').css('display','none');
}
