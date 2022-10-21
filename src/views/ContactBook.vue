<template>
  <div class="page row">
    <div class="col-md-10">
      <InputSearch v-model="searchText" />
    </div>
    <div class="mt-3 col-md-6">
      <h4>
        Danh bạ
        <i class="fas fa-address-book" />
      </h4>
      <ContactList
        v-if="filteredContactsCount > 0"
        :contacts="filteredContacts"
        v-model:activeIndex="activeIndex"
      />
      <p v-else>Không có liên hệ nào.</p>
      <div class="mt-3 row justify-content-around align-items-center">
        <button class="btn btn-sm btn-primary" @click="refreshList()">
          <i class="fas fa-redo" /> Làm mới
        </button>

        <button class="btn btn-sm btn-success" @click="goToAddContact">
          <i class="fas fa-plus" /> Thêm mới
        </button>
        <button class="btn btn-sm btn-danger" @click="onDeleteContacts">
          <i class="fas fa-trash" /> Xóa tất cả
        </button>
      </div>
    </div>
    <div class="mt-3 col-md-6">
      <div v-if="activeContact">
        <h4>
          Chi tiết Liên hệ
          <i class="fas fa-address-card" />
        </h4>
        <ContactCard :contact="activeContact" />
        <router-link
          :to="{
            name: 'contact.edit',
            params: { id: activeContact.id },
          }"
        >
          <span class="mt-2 badge badge-warning">
            <i class="fas fa-edit" /> Hiệu chỉnh</span
          >
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import ContactCard from "@/components/ContactCard.vue";
import InputSearch from "@/components/InputSearch.vue";
import ContactList from "@/components/ContactList.vue";
import { contactService } from "@/services/contact.service";
export default {
  components: {
    ContactCard,
    InputSearch,
    ContactList,
  },
  // The full code will be presented below
  data() {
    return {
      contacts: [],
      activeIndex: -1,
      searchText: "",
    };
  },
  watch: {
    // Monitor changes on searchText.
    // Release the currently selected contact.
    searchText() {
      this.activeIndex = -1;
    },
  },
  computed: {
    // Map contacts to strings for searching.
    contactsAsStrings() {
      return this.contacts.map((contact) => {
        const { name, email, address, phone } = contact;
        return [name, email, address, phone].join("");
      });
    },
    // Return contacts filtered by the search box.
    filteredContacts() {
      if (!this.searchText) return this.contacts;
      return this.contacts.filter((contact, index) =>
        this.contactsAsStrings[index].includes(this.searchText)
      );
    },
    activeContact() {
      if (this.activeIndex < 0) return null;
      return this.filteredContacts[this.activeIndex];
    },
    filteredContactsCount() {
      return this.filteredContacts.length;
    },
  },
  methods: {
    async retrieveContacts() {
      try {
        const contactsList = await contactService.getMany();
        this.contacts = contactsList.sort((current, next) =>
          current.name.localeCompare(next.name)
        );
      } catch (error) {
        console.log(error);
      }
    },
    refreshList() {
      this.retrieveContacts();
      this.activeIndex = -1;
    },
    async onDeleteContacts() {
      if (confirm("Bạn muốn xóa tất cả Liên hệ?")) {
        try {
          await contactService.deleteMany();
          this.refreshList();
        } catch (error) {
          console.log(error);
        }
      }
    },
    goToAddContact() {
        this.$router.push({ path: '/add-contact', name: 'contact.add' });
    },
  },
  mounted() {
    this.refreshList();
  },
};
</script>
<style scoped>
.page {
  text-align: left;
  max-width: 750px;
}
</style>
