import {MigrationInterface, QueryRunner} from "typeorm";

export class AddReservationTable1618932154979 implements MigrationInterface {
    name = 'AddReservationTable1618932154979'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `Reservation` (`id` int NOT NULL AUTO_INCREMENT, `fromDate` datetime NOT NULL, `toDate` datetime NOT NULL, `bookId` int NULL, `userId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `Reservation` ADD CONSTRAINT `FK_3ccf03e7c91b524a8a82e67b705` FOREIGN KEY (`bookId`) REFERENCES `Book`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `Reservation` ADD CONSTRAINT `FK_2e90c1ad8cbf124ae6111f16f87` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `Reservation` DROP FOREIGN KEY `FK_2e90c1ad8cbf124ae6111f16f87`");
        await queryRunner.query("ALTER TABLE `Reservation` DROP FOREIGN KEY `FK_3ccf03e7c91b524a8a82e67b705`");
        await queryRunner.query("DROP TABLE `Reservation`");
    }

}
