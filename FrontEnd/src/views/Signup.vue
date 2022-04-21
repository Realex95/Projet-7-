<template>
    <main class="container">
        <section class="Form">
            <form @submit.prevent="sendForm(event)">
                <p class="text-center"> <img src="../assets/signup.png" alt="image singUp" style="width:10rem"> </p>
                <h1 class="text-center font-weight-bold" style="font-size:0.7rem;">Inscription</h1>
                <div class="form-group">
                    <label for="inputEmail">Email:</label>
                    <input v-on:keydown="invalid = false" v-model="inputEmail" type="email" class="form-control" id="inputEmail" aria-describedby="emailHelp" placeholder="Entrez votre email">
                    <small id="emailHelp" class="form-text text-muted">Entrez une adresse mail valide</small>
                </div>
                <div class="form-group">
                    <label for="inputUserName">Nom d'utilisateur:</label>
                    <input v-on:keydown="invalid = false" v-model="inputUserName" type="text" class="form-control" id="inputUserName" aria-describedby="userNameHelp" placeholder="Entrez votre nom d'utilisateur ">
                    <small id="userNameHelp" class="form-text text-muted">De 3 à 30 caractères</small>
                </div> 
                <div class="form-group">
                    <label for="inputPassword">Choisissez un Mot de passe:</label>
                    <input v-on:keydown="invalid = false" v-model="inputPassword" type="password" class="form-control" id="inputPassword" aria-describedby="passwordHelp" placeholder="Entre votre mot de passe">
                    <small id="passwordHelp" class="form-text text-muted">de 6 à ∞ caractères avec 1 lettre en majuscule, 1 lettre en minuscule et 1 chiffre au minimum</small>
                </div>
                <button type="submit" class="submitBtn text-white shadow font-weight-bold">S'INSCRIRE</button> 
            </form>
        </section>
         <div v-show="invalid" class="invalidBox" key="invalid">
            Veuillez remplir tous les champs du formulaire en suivant les instructions.
        </div> 
    </main>
</template>

<script>
import axios from "axios";
import router from "../router";
import "../main.css"
export default {
    name: "Inscription",
    data() {
        return {
            inputUserName: "",
            inputEmail: "",
            inputPassword: "",
            invalid: false
        }
    },
    methods: {
        sendForm() {
            if ( !this.inputUserName || !this.inputEmail || !this.inputPassword ) {
                return this.invalid = true;
            }
            const nameRegex = /(.*[a-z]){3,30}/;
            const mailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
            const passwordRegex  = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/  
            if ( nameRegex.test(this.inputUserName) && mailRegex.test(this.inputEmail) && passwordRegex.test(this.inputPassword)) {
                axios.post("http://localhost:3000/api/auth/signup", { 
                    userName    : this.inputUserName, 
                    email       : this.inputEmail,
                    password    : this.inputPassword
                })
                .then(() => {
                    alert('inscription réussie, redirection vers le module de connexion');
                    router.push({ path : '/'});
                })
                .catch((error)=>{
                    alert(error.status)
                    console.log(error)});
            } else {
                console.log('validation form, method sendForm, renvoie une erreur')
                this.invalid = true;
            }
        }
    }
}    
</script>