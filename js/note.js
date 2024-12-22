/**
 * getting data form a api,, formula like as json,
 * 
 * use async function for collect data
 
const loadPhone = async () => {
       const res = await fetch('https://openapi.programming-hero.com/api/phones?search=iphone');
       const data = await res.json();
       const phones = data.data;
       console.log(phones);
 }
       loadPhone();// call this function



 */