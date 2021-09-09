<template>
  <div class="container my-5">
    <div class="row justify-content-center">
      <div class="col-8">
        <router-link
          :to="{ name: 'transaction.index' }"
          class="btn btn-primary btn-sm rounded shadow mb-3"
          >back</router-link
        >

        <div class="card rounded shadow">
          <div class="card-header">Edit transaction</div>
          <div class="card-body">
            <form @submit.prevent="update()">
              <div class="mb-3">
                <label for="" class="firm-label">Title</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="transaction.title"
                  required
                />
                <div class="text-danger">Validation message</div>
              </div>
              <div class="mb-3">
                <label for="" class="firm-label">Amount</label>
                <input
                  type="number"
                  class="form-control"
                  v-model="transaction.amount"
                  required
                />
                <div class="text-danger">Validation message</div>
              </div>
              <div class="mb-3">
                <label for="" class="firm-label">time</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="yyyy-mm-dd hh:mm:ss"
                  v-model="transaction.time"
                  required
                />
                <div class="text-danger">Validation message</div>
              </div>
              <div class="mb-3">
                <label for="" class="firm-label">Type</label>
                <select
                  name=""
                  id=""
                  class="form-select"
                  v-model="transaction.type"
                  required
                >
                  <option value="expense">Expense</option>
                  <option value="revenue">Revenue</option>
                </select>
                <div class="text-danger">Validation message</div>
              </div>

              <button class="btn btn-outline-primary">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import axios from 'axios';
export default {
  setup() {
    //data binding

    let transaction = reactive({
      title: '',
      amount: '',
      time: '',
      type: '',
    });

    const validation = ref([]);

    const router = useRouter();
    const route = useRoute();

    onMounted(() => {
      axios
        .get(
          `https://6138e2ca163b56001703a159.mockapi.io/dsa/dsadsa/${route.params.id}`
        )
        .then((result) => {
          transaction.title = result.data.title;
          transaction.amount = result.data.amount;
          transaction.time = result.data.time;
          transaction.type = result.data.type;
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    });

    function update() {
      axios
        .put(
          `https://6138e2ca163b56001703a159.mockapi.io/dsa/dsadsa/${route.params.id}`,
          transaction
        )
        .then(() => {
          router.push({
            name: 'transaction.index',
          });
        })
        .catch((err) => {
          validation.value = err.response.data;
        });
    }

    return {
      transaction,
      validation,
      router,
      route,
      update,
    };
  },
};
</script>
