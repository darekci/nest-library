import {MigrationInterface, QueryRunner} from "typeorm";

export class UserTable1618750316238 implements MigrationInterface {
    name = 'UserTable1618750316238'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `User` (`id` int NOT NULL AUTO_INCREMENT, `fullName` varchar(100) NOT NULL, `number` varchar(8) NOT NULL, `phone` varchar(20) NOT NULL, `email` varchar(100) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE `User`");
    }

}
