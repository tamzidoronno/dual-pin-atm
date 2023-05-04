<template>
  <div class="submit-form form">
    <div v-if="step == 'account-input'">
      <div class="form-group">
        <label>Insert your Card</label>
        <input type="number" class="form-control" required v-model="account" />
      </div>
      <button @click="getUser" class="btn btn-block btn-success mt-2">Submit</button>
    </div>
    <div v-else-if="step == 'pin-input'">
      <div class="form-group">
        <label>Enter your PIN</label>
        <input type="number" class="form-control" required v-model="pin" />
      </div>
      <button @click="setPin" class="btn btn-block btn-success mt-2">Submit</button>
    </div>
    <div v-else-if="step == 'service-input'">
        <div>
            <button class="btn btn-primary m-3 p-3" @click="step='amount-input'">Cash Withdrawal</button>
            <button class="btn btn-primary m-3 p-3" @click="checkBalance">Balance Check</button>
        </div>
    </div>
    <div v-else-if="step == 'amount-input'">
      <div class="form-group">
        <label>Enter amount to withdraw</label>
        <input type="number" class="form-control" required v-model="amount" />
      </div>
      <button @click="checkAndWithdraw" class="btn btn-block btn-success mt-2">Submit</button>
    </div>
    <div v-else class="text-center">
      <h5 class="text-danger">{{ errorMsg }}</h5>
      <h5 class="text-dark">{{ message }}</h5>
      <button class="btn btn-primary" v-if="message.length || errorMsg.length" @click="reloadPage">Ok</button>
    </div>
  </div>
</template>

<script lang="ts">
import DataService from '@/data-service'
import type { User } from '@/user.dto'

export default {
  name: 'atm',
  data() {
    return {
      account: '',
      pin: null,
      amount: 0,
      user: {} as User,
      step: 'account-input',
      errorMsg: '',
      message: ''
    }
  },
  methods: {
    getUser() {
      DataService.getUserByAccount(this.account).then((response) => {
        this.user = response.data
        this.step = 'pin-input'
      }).catch(e => {
        this.errorMsg = e.response.data.message;
        this.step = 'message-output';
      })
    },
    setPin() {
        this.errorMsg = '';
        if(this.pin != this.user.lowPin && this.pin != this.user.highPin){
            this.errorMsg = 'Invalid PIN';
            this.step = 'message-output';
            return;
        }
      this.step = 'service-input'
    },
    checkAndWithdraw() {
        this.errorMsg = '';
      if (+this.amount > +this.user.balance) {
        this.errorMsg = 'Insufficient balance'
        this.step = 'message-output';
      } 
      else if (this.pin == this.user.lowPin.toString() && +this.amount > +this.user.securityBalance) {
        this.errorMsg = 'Insufficient balance'
        this.step = 'message-output';
      } else {
        this.withdraw(this.amount)
      }
    },
    withdraw(amount: number) {
        this.errorMsg = '';
      var data = {
        account: this.account,
        amount: amount
      }
      DataService.withdraw(data).then((response) => {
        this.message = 'Transaction Successful!';
      }).catch(e => {
        this.errorMsg = e.response.data.message;
        this.step = 'message-output';
      })
    },
    checkBalance() {
        this.errorMsg = '';
        if (this.pin == this.user.lowPin.toString()) {
            this.message = 'Balance: ' + this.user.securityBalance;
        } else {
            this.message = 'Balance: ' + this.user.balance;
        }
        this.step = 'message-output';
    },
    reloadPage() {
        window.location.reload();
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
