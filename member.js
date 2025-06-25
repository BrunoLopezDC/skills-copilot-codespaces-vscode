function skillsMember() {
  return {
    name: "Member",
    description: "A member of the team with specific skills.",
    skills: [],
    addSkill(skill) {
      this.skills.push(skill);
    },
    listSkills() {
      return this.skills.join(", ");
    }
  };
}