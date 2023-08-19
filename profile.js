import {app,getFirestore,auth,signOut,getDocs,collection ,db,getDoc, addDoc,deleteDoc,updateDoc,doc,setDoc,getAuth} from "./firebase.js"
var getUsers = JSON.parse(localStorage.getItem("user"))
console.log(getUsers)
window.addEventListener('load',function(){
    if(getUsers != null){
        
    }else{
        window.history.back()
    }
})
var imgPro = document.getElementById('imgPro')
var fname = document.getElementById('fname')
if ( getUsers != null){
    const docRef = doc(db, "users", getUsers);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        imgPro.src = docSnap.data().userImage
        fname.innerHTML=docSnap.data().fullName
        

    } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
}
}else{
    console.log('loged')
}