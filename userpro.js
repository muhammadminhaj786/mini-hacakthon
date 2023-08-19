import { app, getFirestore, auth, signOut, getDocs, collection, db, getDoc, addDoc, deleteDoc, updateDoc, doc, setDoc, getAuth, serverTimestamp } from "./firebase.js"

window.addEventListener('load',async function(){
    const showPro = document.getElementById('showPro')
    const userDataPro = JSON.parse(localStorage.getItem('proId')) 
    const querySnapshot = await getDocs(collection(db, "blogs"));
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            var data = doc.data()
            if (userDataPro == data.uid) {
                var newCard = `           <div class="card mt-3" id="myCard">
      <div class="info">
        <div class="divImg d-flex m-3 my-border">
          <img src="${data.Image}" alt="" height="80px" width="100px">
          <div class="material mt-3"> <p class="m-3">${data.fullName}</p>
          <div class="mt-3 m-3 "> ${data.timeStamp.toDate()}</div>
          </div>
    
        </div>
        <p class="mt-3 m-3">${doc.data().title}</p>
        
      </div>
      <div class="details mt-2">
        <p class="m-3">
          ${data.desc}
        </p>
      </div>
      <div class="btns ">
       
    
      </div>
    </div>`
    
    showPro.innerHTML += newCard
    
            }
    
        });
})