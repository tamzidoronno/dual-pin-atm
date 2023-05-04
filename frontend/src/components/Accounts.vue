<template>
    <div class="submit-form form">
      <div v-if="!submitted">
        <div class="form-group">
          <label>Name</label>
          <input type="text" class="form-control" required v-model="user.name" />
        </div>
  
        <div class="form-group">
          <label>PIN</label>
          <input type="text" class="form-control" required v-model="user.lowPin" />
        </div>
        <div class="form-group">
          <label>Low Amount PIN</label>
          <input type="text" class="form-control" required v-model="user.highPin" />
        </div>
        <div class="form-group">
          <label>Initial Deposit</label>
          <input type="text" class="form-control" required v-model="user.balance" />
        </div>
  
        <button @click="saveUser" class="btn btn-block btn-success mt-2">Submit</button>
      </div>
  
      <div v-else>
        <h5>Account created successfully!</h5>
        <h3>Acc No: {{user.account}}</h3>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import DataService from '@/data-service'
  
  export default {
    name: 'register',
    data() {
      return {
        user: {
          id: null,
          name: '',
          account: '',
          lowPin: '',
          highPin: '',
          balance: 0
        },
        submitted: false
      }
    },
    methods: {
      saveUser() {
          var validation = this.validateUser();
          if(validation != '')
          {
              alert(validation);
              return;
          }
        DataService.register(this.user)
          .then((response) => {
            this.user = response.data
            console.log(response.data)
            this.submitted = true
          })
          .catch((e) => {
            console.log(e)
          })
      },
  
      validateUser() {
        if(this.user.lowPin == this.user.highPin)
          return 'You cannot set same PINs'
        if(this.user.balance < 500)
          return 'Miminum deposit is 500'
        return '';
      }
    }
  }
  </script>
  
  <style>
  .submit-form {
    max-width: 300px;
    margin: auto;
  }
  </style>
  