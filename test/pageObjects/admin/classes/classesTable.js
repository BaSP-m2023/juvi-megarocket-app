class ClassesForm {
  get titlePage() {
    return $('[data-testid="admin-classes-section"] h2');
  }
}

module.exports = new ClassesForm();
