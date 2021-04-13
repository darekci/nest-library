"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookTable1618327317917 = void 0;
class BookTable1618327317917 {
    constructor() {
        this.name = 'BookTable1618327317917';
    }
    async up(queryRunner) {
        await queryRunner.query("CREATE TABLE `book` (`id` int NOT NULL AUTO_INCREMENT, `author` varchar(100) NOT NULL, `title` varchar(300) NOT NULL, `isbn` varchar(30) NULL, `publishDate` datetime NULL, `publisher` varchar(100) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }
    async down(queryRunner) {
        await queryRunner.query("DROP TABLE `book`");
    }
}
exports.BookTable1618327317917 = BookTable1618327317917;
//# sourceMappingURL=1618327317917-BookTable.js.map