const handleSpinnig = (isspining) =>
  {
    const getSpinSection = document.getElementById('spinnig-section')
 if(isspining)
 {
    getSpinSection.classList.remove('hidden');
 }
  else
  {
    getSpinSection.classList.add('hidden');

  }
}

 const handleFalseSearch = (ifFalse) =>
   {
     const getFalseSearch = document.getElementById('no-match-search');
     if(ifFalse)
     {
      getFalseSearch.classList.remove('hidden')  

     }
     else
      {
        getFalseSearch.classList.add('hidden')  

      }
   } 

const handleSearchOption = (isshowall) =>
  {   
    handleSpinnig(true);
    const getSearchKeyWord = document.getElementById('search-input');
      const getSearchKeyWordText = getSearchKeyWord.value;
      getPhonesApi(getSearchKeyWordText,isshowall);
  }

const getPhonesApi = async (Text,isshowall) =>
{

// const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${Text}`);
//     const data = await res.json();
//     phones = data.data;
//    displayPhones(phones,isshowall)
fetch(`https://openapi.programming-hero.com/api/phones?search=${Text}`)
.then(res => res.json())
.then(phones =>
{
  if((phones.data).length === 0)
  {
    // console.log("not enough")
    handleSpinnig(true)
    handleFalseSearch(true)
    handleSpinnig(false)
    displayPhones([])
}
  else
  {
    displayPhones(phones.data,isshowall)
  }
}
   )

  }
const displayPhones = (phones,isshowall) =>
{
  
    const displayPhone = document.getElementById('Phones-container')
    displayPhone.textContent = '';
  
//  handle show all button
       const getShowAllButton = document.getElementById('showAllButton'); 
       if(phones.length > 12 && !isshowall)
        {
           //  get show all button
           getShowAllButton.classList.remove('hidden');
        }
        else
        {
          getShowAllButton.classList.add('hidden');
  
        }
      
      //  show limited mobiles
      if(!isshowall)
      {
        phones =  phones.slice(0,12);
      }
     
 phones.forEach(phone => {
     const phoneCard = document.createElement('div');
     phoneCard.classList = `card card-compact bg-gray-100 drop-shadow-lg p-5`;
     phoneCard.innerHTML = `
          <figure>
         <img
           src="${phone.image}"
           alt="Shoes" />
       </figure>
       <div class="card-body">
         <h2 class="card-title">${phone.phone_name}</h2>
         <h4>Brand: ${phone.brand}</h4>
         <p>If a dog chews shoes whose shoes does he choose?</p>
         <div class="card-actions">
         <div class="flex ">
<button onclick="showDetails('${phone.slug}')" class="btn btn-primary justify-center">Show Details</button>
         </div>
           
         </div>
       </div>
     `
     displayPhone.appendChild(phoneCard)
     handleSpinnig(false)
     handleFalseSearch(false)

 });
    }   
 

const showDetails = async (id) =>
{
  const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
  const data = await res.json();
  const phoneDetails = data.data;
  handleShowDetails(phoneDetails)

}

const handleShowDetails = (details) =>
{
  // show The Modal
  show_modal.showModal();
  console.log(details);
  const showModal = document.getElementById('show_modal');
  
  const div = document.createElement('div');
  div.classList.add('modal-box');
  div.innerHTML = `
    <div class="flex justify-center">
    <img src="${details.image}" alt="">
    </div>
   <h3 class="text-lg font-bold">${details.name}</h3>
    <h4><span class="font-semibold">Storage: </span>${details?.mainFeatures?.storage}</h4>
    <h4><span class="font-semibold">GPS: </span>${details?.others?.GPS ? details.others.GPS : "No Gps Available" }</h4>
    <p class="py-4">Press ESC key or click the button below to close</p>
    <div class="modal-action">
      <form method="dialog">
        <!-- if there is a button in form, it will close the modal -->
        <button class="btn">Close</button>
      </form>
    </div>
  `;
  showModal.appendChild(div)
}




const handleShowAllButton = () =>
{
  handleSearchOption(true);
}
// getPhonesApi();