<template>
  <div class="container my-5">
    <div class="row justify-content-center">
      <div class="col-8">
        <router-link
          :to="{ name: 'transaction.create' }"
          class="btn btn-primary btn-sm rounded shadow mb-3"
          >add</router-link
        >

        <div class="card rounded shadow">
          <div class="card-header">transaction list</div>
          <div class="card-body">
            <table class="table">
              <thead>
                <tr>
                  <th>title</th>
                  <th>amount</th>
                  <th>type</th>
                  <th>action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(transaction, index) in transactions" :key="index">
                  <td>{{ transaction.title }}</td>
                  <td>{{ transaction.amount }}</td>
                  <td>{{ transaction.type }}</td>
                  <td>
                    <div class="btn-group">
                      <router-link
                        :to="{
                          name: 'transaction.edit',
                          params: { id: transaction.id },
                        }"
                        class="btn btn-sm btn-outline-info"
                        >edit
                      </router-link>
                      <button
                        class="btn btn-sm btn-outline-danger"
                        @click.prevent="
                          destroy(transaction.id, index), loadOnce()
                        "
                      >
                        delete
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { onMounted, ref } from 'vue';

export default {
  setup() {
    //reactive state
    let transactions = ref([]);

    onMounted(() => {
      //get data api

      axios
        .get('https://6138e2ca163b56001703a159.mockapi.io/dsa/dsadsa')
        .then((result) => {
          transactions.value = result.data;
        })
        .catch((err) => {
          console.log(err.response);
        });
    });

    function destroy(id, index) {
      axios
        .delete(`https://6138e2ca163b56001703a159.mockapi.io/dsa/dsadsa/${id}`)
        .then(() => {
          transactions.value.data.splice(index, 1);
        })
        .catch((err) => {
          console.log(err.response);
        });
    }

    return {
      transactions,
      destroy,
    };
  },

  methods: {
    loadOnce: function () {
      setTimeout(function () {
        location.reload();
      }, 500);
    },
  },
};
</script>
