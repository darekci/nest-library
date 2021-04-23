import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialTables1619210326816 implements MigrationInterface {
    name = 'InitialTables1619210326816'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `User` (`id` int NOT NULL AUTO_INCREMENT, `fullName` varchar(100) NOT NULL, `number` varchar(8) NOT NULL, `phone` varchar(20) NOT NULL, `email` varchar(100) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `Reservation` (`id` int NOT NULL AUTO_INCREMENT, `fromDate` datetime NOT NULL, `toDate` datetime NOT NULL, `returnDate` datetime NULL, `bookId` int NULL, `userId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `Book` (`id` int NOT NULL AUTO_INCREMENT, `author` varchar(100) NOT NULL, `title` varchar(300) NOT NULL, `isbn` varchar(30) NULL, `publishYear` int NULL, `publisher` varchar(100) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `Reservation` ADD CONSTRAINT `FK_3ccf03e7c91b524a8a82e67b705` FOREIGN KEY (`bookId`) REFERENCES `Book`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `Reservation` ADD CONSTRAINT `FK_2e90c1ad8cbf124ae6111f16f87` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `Reservation` DROP FOREIGN KEY `FK_2e90c1ad8cbf124ae6111f16f87`");
        await queryRunner.query("ALTER TABLE `Reservation` DROP FOREIGN KEY `FK_3ccf03e7c91b524a8a82e67b705`");
        await queryRunner.query("DROP TABLE `Book`");
        await queryRunner.query("DROP TABLE `Reservation`");
        await queryRunner.query("DROP TABLE `User`");
    }

}
