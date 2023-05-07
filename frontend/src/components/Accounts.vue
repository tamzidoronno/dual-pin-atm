<template>
    <div class="submit-form form">
      <h3>Accounts</h3>
      <table class="table table-bordered">
        <thead>
          <tr>
            <th scope="col">Acc No.</th>
            <th scope="col">Acc Name</th>
            <th scope="col">Balance</th>
            <th scope="col">Security Balance</th>
          </tr>
        </thead>
        <tbody>
            <tr v-for="(user,key) in users" :key="key">
              <td>{{user.account}}</td>
              <td>{{user.name}}</td>
              <td>{{user.balance}}</td>
              <td>{{user.securityBalance}}</td>
            </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script lang="ts">
  import DataService from '@/data-service'
  
  export default {
    name: 'accounts',
    data() {
      return {
        users: []
      }
    },
    created() {
        this.getAccounts();
    },
    methods: {
      getAccounts() {
        DataService.getUsers()
          .then((response) => {
            this.users = response.data
          })
          .catch((e) => {
            console.log(e)
          })
      }
    }
  }
  </script>
  
  <style>
  .submit-form {
    max-width: 1000px;
    margin: auto;
  }
  </style>
  