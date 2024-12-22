const loadPhone = async (searchText='iphone', isShowAll) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
  const data = await res.json();
  const phones = data.data;
  displayPhones(phones, isShowAll);
}

const displayPhones = (phones, isShowAll) => {
  // console.log(phones)//show all phone in console
  // step 1. get the container id
  const phoneContainer = document.getElementById('phone-container');

  //clear phone container cards before adding new cards
  phoneContainer.textContent = '';
  // console.log(phones.length);// show how many items

  //display seen see more button, if there are more than 12 phones and less than 12 phone not see see more button
  const showAllContainer = document.getElementById('see-more');
  if (phones.length > 12 && !isShowAll) {
    showAllContainer.classList.remove('hidden');
  }
  else {
    showAllContainer.classList.add('hidden');
  }


  //display only show 12 phones if not show all
  if (!isShowAll) {
    phones = phones.slice(0, 12);
  }

  phones.forEach(phone => {
    // console.log(phone);
    //step 2. create a div
    const phoneCard = document.createElement('div');
    phoneCard.classList = ` card shadow-xl p-5`;
    // step 3. set innerHTML
    phoneCard.innerHTML = `
         <figure>
                    <img
                      src="${phone.image}"
                      alt="Shoes" />
                  </figure>
                  <div class="card-body">
                    <h2 class="card-title">${phone.phone_name}</h2>
                    <p>If a dog chews shoes whose shoes does he choose?</p>
                    <div class="card-actions justify-center">
                      <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
                    </div>
                  </div>
        `
    // step 4  . sect child with appendChild
    phoneContainer.appendChild(phoneCard);
  });

  //hide loading spinner
  toggleLoadingSpinner(false);

}

//handle show details button
const handleShowDetails = async (id) => {
  // console.log(id);//get unique id
  //load single phone data
  const res = await fetch(` https://openapi.programming-hero.com/api/phone/${id}`);
const data = await res.json();
const phone = data.data;
showPhoneDetails(phone);
}

//show phone details
const showPhoneDetails = (phone) =>{
  console.log(phone);
  
  const showDetailsContainer = document.getElementById('show-details-container');
  showDetailsContainer.innerHTML = `
  <img src="${phone.image}" alt="" class="m-auto"/>
  <h1 class="text-3xl font-extrabold mt-6 mb-6">${phone.name}<h1/>
 
  <p><strong> ChipSet : </strong>${phone?.mainFeatures?.chipSet || 'NO Chip Set'} </P>
  <p><strong> Memory : </strong>${phone?.mainFeatures?.memory || 'NO Memory'}</P>
  <p><strong> Display Size : </strong>${phone?.mainFeatures?.displaySize || 'NO display'}</P>
  <p><strong> Storage : </strong>${phone?.mainFeatures?.sensors?.storage || 'Search in google for Storage'}</P>
  <p><strong> USB : </strong>${phone?.others?.USB ||  'NO USb'}</P>
  <p><strong> GPS : </strong>${phone?.others?.GPS || 'NO GPS'}</P>
  <p><strong> WLAN :</strong>${phone?.others?.WLAN || 'NO WALN'}</P>
  
  
  `

  //show the modal
  showDetailsModal.showModal();
}



// handle search button
const handleSearch = (isShowAll) => {
  toggleLoadingSpinner(true);
  const searchField = document.getElementById('search-field');
  const searchText = searchField.value;
  loadPhone(searchText, isShowAll);
}


// // same as handles search button handle search recap
// const handleSearch2 = () => {
//   toggleLoadingSpinner(true);
//   const searchField = document.getElementById('search-field-2');
//   const searchText = searchField.value;
//   loadPhone(searchText);
// }

const toggleLoadingSpinner = (isLoading) => {
  const loadingSpinner = document.getElementById('loading-spinner');
  if (isLoading) {
    loadingSpinner.classList.remove('hidden');
  }
  else {
    loadingSpinner.classList.add('hidden');
  }
}

//handle see more button
const handleSeeMore = () => {
  handleSearch(true);
}

loadPhone();