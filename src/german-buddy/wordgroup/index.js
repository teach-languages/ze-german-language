class WordGroup extends Array {
    /**
     * Add Words/WordGroups to the WordGroup
     * @param {Word || WordGroup} item Push new word to group or destructure word group to prevent
     * WordGroups inside of WordGroups
     */
    push(item) {
        if(item instanceof WordGroup) {
            super.push(...item);
        } else if(item !== undefined) {
            super.push(item);
        }
    }

    constructor() {
        super();
    }
}

module.exports = WordGroup;