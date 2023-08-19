import { app, getFirestore, auth, signOut, getDocs, collection, db, getDoc, addDoc, deleteDoc, updateDoc, doc, setDoc, getAuth, serverTimestamp } from "./firebase.js"

let parentCard = document.querySelector('.parentCard')

window.addEventListener('load', async function () {
    
    var localUser = JSON.parse(localStorage.getItem("users"))
    if(localUser!=null){
        const querySnapshot = await getDocs(collection(db, "blogs"));
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            var data = doc.data()
            if (localUser.userid == data.uid) {
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
        <button id="editBtn" class="btn btn-info" onclick="edit('${doc.id}')" >Edit</button>
        <button id="dleteBtn" class="btn btn-danger" onclick="dle(this,'${doc.id}')">Delete</button>
    
      </div>
    </div>`
                parentCard.innerHTML += newCard
    
            }
    
        });
    }

if(localUser==null){
    const blogCard = document.querySelector('.blogCard')
    const querySnapshot = await getDocs(collection(db, "blogs"));
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            var data = doc.data()

                var newCard = `           <div class="card mt-3" id="myCard">
      <div class="info">
        <div class="divImg d-flex m-3 my-border">
          <img src="${data.Image}" alt="" onclick="getProId('${data.uid}')" height="80px" width="100px">
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
     
    </div>`
    blogCard.innerHTML += newCard
    
            
    
        });
}
})

var getUsers = JSON.parse(localStorage.getItem("user"))
console.log(getUsers)
var blogForm = document.querySelector('.main-body')
var mainTwo = document.querySelector('.main-two')
console.log(blogForm)


if (getUsers != null) {
    mainTwo.classList.add('hidden')
    var publishBtn = document.getElementById('publishBtn')
    // publishBtn.addEventListener('click',addblog)

    const docRef = doc(db, "users", getUsers);
    const docSnap = await getDoc(docRef);
    var title = document.getElementById('title')
    var desc = document.getElementById('desc')


    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        var UserName = docSnap.data().fullName
        var LastName = docSnap.data().LastName
        var cName = UserName + " " + LastName
        console.log(UserName)
        var a = document.getElementById('getName')
        a.classList.add('color')
        a.innerHTML += cName

    } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
    }
    let logBtn = document.getElementById('logBtn')
    logBtn.addEventListener('click', Logout)
    async function Logout() {
        await signOut(auth).then(() => {
            localStorage.clear()
            alert('logout')
            window.location.reload()
            // window.location.replace('./login.html')
            console.log(logBtn)
        }).catch((error) => {
            alert(error.message)
            console.log(error.message)
        });

    }


} else {
    blogForm.classList.add('hidden')
    // mainTwo.classList.add('show')
    logBtn.innerHTML = "LogIn"
    logBtn.addEventListener('click', navLog)
    function navLog() {
        window.location.replace('./login.html')
    }
}

async function addblog() {
    var allUsers = JSON.parse(localStorage.getItem('users'))
    console.log(allUsers)
    const blogObj = {
        title: title.value,
        desc: desc.value,
        Image: allUsers.userImage,
        timeStamp: serverTimestamp(),
        fullName: allUsers.fullName + " " + allUsers.LastName,
        uid: allUsers.userid

    }
    const docRef = await addDoc(collection(db, "blogs"), blogObj);
    console.log("Document written with ID: ", docRef.id);
    window.location.reload()


}

async function edit(e) {
    const editTitle = prompt("Enter a new title")
    const editDesc = prompt("Enter a Description")
    console.log(editTitle)

    if (editTitle == "" || editDesc == "") {
        alert('Please input')
        return
    }


    const docRef = doc(db, "blogs", e);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        const blogData = docSnap.data()
        blogData.title = editTitle
        blogData.desc = editDesc
        const newdata = doc(db, 'blogs', e)
        await updateDoc(newdata, blogData)
        console.log(blogData)
        window.location.reload()
    } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
    }
}
async function dle(e, id) {
    e.parentNode.parentNode.remove()
    await deleteDoc(doc(db, "blogs", id));

}


function getProId(e){
    console.log(e)
    localStorage.setItem('proId',JSON.stringify(e))
    window.location.replace('./userpro.html')
}

window.addblog = addblog
window.edit = edit
window.dle = dle
window.getProId =getProId
