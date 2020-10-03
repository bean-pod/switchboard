/* This data is only loaded when using h2 in memory database,to enable h2: uncomment the line "#spring.datasource.url=jdbc:h2:mem:testdb"
   in application.properties
 */

insert into device(serial_number, display_name, Status) values (1,'Device1','Running');
insert into device(serial_number, display_name, Status) values (2,'Device2','Running');
insert into encoder(serial_number) values(1);
