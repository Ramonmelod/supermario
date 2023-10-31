/*create schema recordistamario*/
create table listarecordistas (
	i_idrecordista_listarecordistas int primary key auto_increment,
    s_nome_listarecordistas varchar(50) not null,
    i_pontuacao_listarecordistas int not null
);

insert into listarecordistas values(01,'Fabio Matys',1896);
insert into listarecordistas values(02,'Ramon Melo',211);
select * from listarecordistas