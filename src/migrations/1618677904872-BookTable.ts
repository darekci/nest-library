import {MigrationInterface, QueryRunner} from "typeorm";

export class BookTable1618677904872 implements MigrationInterface {
    name = 'BookTable1618677904872'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `Book` (`id` int NOT NULL AUTO_INCREMENT, `author` varchar(100) NOT NULL, `title` varchar(300) NOT NULL, `isbn` varchar(30) NULL, `publishYear` int NULL, `publisher` varchar(100) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE `Book`");
    }

}
