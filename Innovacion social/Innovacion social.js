function randint(minimo,maximo){
    return Math.round(Math.random()*(maximo-minimo)+minimo);
}
class Localidades{
    constructor(n_localidades){
        this.n_localidades=n_localidades;
    }
    Localidades_ICK(){
        let id_localidades=[];
        var localidad_a=0
        while (localidad_a<n_localidades){
            var localidad=randint(1,200);
            if (id_localidades.indexOf(localidad)==-1){
                id_localidades.push(localidad)
                localidad_a+=1
            }
        }
        let paso=Math.round(200/(Math.round(n_localidades**0.5)+1))-1;
        let direcciones=[];
        let direccion_1=1;
        let direccion_2=direccion_1+paso;
        var localidad_a=0;
        while (direccion_2<200){
            direcciones.push([direccion_1,direccion_2]);
            direccion_1+=paso;
            direccion_2+=paso;
            localidad_a+=1;
        }
        let calles=[]
        let carreras=[]
        let calles_localidades=[]
        let carreras_localidades=[]
        for  (var j=0;j<direcciones.length;j++){             
            for (var i=0;i<direcciones.length;i++){
                calles.push(direcciones[i]);
                carreras.push(direcciones[j]);
            }
        calles_localidades=calles.slice(0,n_localidades);
        carreras_localidades=carreras.slice(0,n_localidades);
        }
        return[id_localidades,calles_localidades,carreras_localidades];
    }
}
class Zonas{
    constructor(n_zonas){
        this.n_zonas=n_zonas;
    }
    Zonas_ICKF(){
        let id_zonas=[];
        var zona_a=0;
        while (zona_a<n_zonas*n_localidades){
            var zona=randint(1,200);
            if (id_zonas.indexOf(zona)==-1){
                id_zonas.push(zona);
                zona_a+=1;
            }
        }
        let calles_zonas=[];
        let carreras_zonas=[];
        for (var k=0;k<n_localidades;k++){
            let direcciones=[];
            let limite_1=calles_localidades[k][0];
            let limite_2=calles_localidades[k][1];
            let paso=Math.round((limite_2-limite_1)/(Math.round(n_zonas**0.5)+1))-1
            let direccion_1=limite_1;
            let direccion_2=limite_1+paso;
            var localidad_a=0 ;
            while (direccion_2<limite_2){
                direcciones.push([direccion_1,direccion_2]);
                direccion_1+=paso;
                direccion_2+=paso;
                localidad_a+=1;
            }
            let calles=[];
            let carreras=[];
            for (var j=0;j<direcciones.length;j++){
                for (var i=0;i<direcciones.length;i++){
                    calles.push(direcciones[i]);
                    carreras.push(direcciones[j]);
                }
            }
            calles_zonas.push(calles.slice(0,n_zonas));
            carreras_zonas.push(carreras.slice(0,n_zonas));
        }
        let riesgos_zonas=[];
        for (var h=0;h<n_localidades;h++){
            let riesgos=[];
            for (var i=0;i<n_zonas;i++){
                let factores_riesgo=["P","M","PR","HC","HS","GAML","N"];
                let riesgo_zona=[]
                var presencia_riesgos=randint(0,10)
                if (presencia_riesgos<2){
                    riesgo_zona.push("N")
                }
                else{
                    var numero_riesgos=randint(0,6)
                    for (var l=0;l<numero_riesgos;l++){
                        let riesgo=factores_riesgo[randint(0,numero_riesgos)]
                        if (riesgo_zona.indexOf(riesgo)==-1){
                            riesgo_zona.push(riesgo);
                        }
                    }
                }
                if (riesgo_zona.length==0){
                    riesgo_zona.push("N")
                }
                riesgos.push(riesgo_zona); 
            }
            riesgos_zonas.push(riesgos);
        }
        return[id_zonas,calles_zonas,carreras_zonas,riesgos_zonas];
    }
}
class Residencias{
    constructor(n_residencias){
        this.n_residencias=n_residencias;
    }
    Residencias_ICK(){
        let id_residencias=[];
        var residencia_a=0;
        while (residencia_a<n_residencias*n_zonas*n_localidades){
            var residencia=randint(1,500);
            if (id_residencias.indexOf(residencia)==-1){
                id_residencias.push(residencia);
                residencia_a+=1;
            }
        }
        let direccion_a=0;
        let direccion_localidades=[];
        for (var i=0;i<n_localidades;i++){
            let direccion_zonas=[];
            for (var j=0;j<n_zonas;j++){
                let direccion_residencia=[];
                for (var k=0;k<n_residencias;k++){
                    var calle_carrera=randint(0,1);
                    if (calle_carrera==0){
                        var direccion="Calle ";
                        direccion+=(randint(calles_zonas[i][j][0],calles_zonas[i][j][1])).toString();
                        direccion+="#"+(randint(carreras_zonas[i][j][0],carreras_zonas[i][j][1])).toString();
                        direccion+="-"+(id_residencias[direccion_a]).toString();
                    }
                    if (calle_carrera==1){
                        var direccion="Carrera ";
                        direccion+=(randint(carreras_zonas[i][j][0],carreras_zonas[i][j][1])).toString();
                        direccion+="#"+(randint(calles_zonas[i][j][0],calles_zonas[i][j][1])).toString();
                        direccion+="-"+(id_residencias[direccion_a]).toString();
                    }
                    direccion_residencia.push(direccion);
                    direccion_a+=1;
                }
                direccion_zonas.push(direccion_residencia);
            }
            direccion_localidades.push(direccion_zonas);
        }
        return[id_residencias,direccion_localidades];
    }
}
class Escuelas{
    constructor(n_escuelas){
        this.n_escuelas=n_escuelas;
    }
    Escuelas_ICK(){
        let id_escuelas=[];
        var escuela_a=0;
        while (escuela_a<n_escuelas*n_zonas*n_localidades){
            let escuela=randint(1,500);
            if (id_escuelas.indexOf(escuela)==-1){
                id_escuelas.push(escuela);
                escuela_a+=1;
            }
        }
        let direccion_a=0;   
        let direccion_localidades=[];
        for (var i=0;i<n_localidades;i++){
            let direccion_zonas=[];
            for (j=0;j<n_zonas;j++){
                let direccion_escuela=[];  
                for (var k=0;k<n_escuelas;k++){
                    let calle_carrera=randint(0,1);
                    if (calle_carrera==0){
                        var direccion="Calle ";
                        direccion+=(randint(calles_zonas[i][j][0],calles_zonas[i][j][1])).toString();
                        direccion+="#"+(randint(carreras_zonas[i][j][0],carreras_zonas[i][j][1])).toString();
                        direccion+="-"+(id_residencias[direccion_a]).toString();
                    }
                    if (calle_carrera==1){
                        var direccion="Carrera ";
                        direccion+=(randint(carreras_zonas[i][j][0],carreras_zonas[i][j][1])).toString();
                        direccion+="#"+(randint(calles_zonas[i][j][0],calles_zonas[i][j][1])).toString();
                        direccion+="-"+(id_residencias[direccion_a]).toString();
                    }
                    direccion_escuela.push(direccion);
                    direccion_a+=1;
                }
                direccion_zonas.push(direccion_escuela);
            }
            direccion_localidades.push(direccion_zonas);
        }
        let direcciones=[];
        for (var i=0;i<direccion_localidades.length;i++){
            for (var j=0;j<direccion_localidades[i].length;j++){
                for (var k=0;k<direccion_localidades[i][j].length;k++){
                    direcciones.push(direccion_localidades[i][j][k]);
                }   
            }        
        }
        return[id_escuelas,direcciones];
    }
}
class Estudiantes{
    constructor(){
        this.n_estudiantes=n_localidades*n_zonas*n_residencias
    }
    Estudiantes_ESGEJADRP(){
        let datos_estudiantes=[];
        for (var i=0;i<this.n_estudiantes;i++){
            var Edad=randint(0,25);
            var Sexo=["Masculino","Femenino"][randint(0,1)];
            var Genero=["H","L","G","B","T","I","Q"][randint(0,6)];
            var Etnia=["Si", "No"][randint(0,1)];
            var JornadaE=["Mañana", "Tarde","Noche"][randint(0,2)];
            var Ausencia=randint(0, 100);
            var Disciplina=["D","F","A","O"][randint(0,3)];
            var RelacionesI=["D","F","A","O"][randint(0,3)];
            var PresenciaP=["D","F","A","O"][randint(0,3)];
            datos_estudiantes.push([Edad,Sexo,Genero,Etnia,JornadaE,Ausencia,Disciplina,RelacionesI,PresenciaP]);
        }
        return[datos_estudiantes];
    }   
}
/*Datos iniciales*/
let n_localidades=3; 
let n_zonas=5;
let n_residencias=30;
let n_escuelas=4;
/*Localidades*/
let datos_localidades=new Localidades(n_localidades).Localidades_ICK();
let id_localidades=datos_localidades[0];
let calles_localidades=datos_localidades[1];
let carreras_localidades=datos_localidades[2];
/*Zonas*/
let datos_zonas=new Zonas(n_zonas).Zonas_ICKF();
let id_zonas=datos_zonas[0];
let calles_zonas=datos_zonas[1];
let carreras_zonas=datos_zonas[2];
let factores_riesgo=datos_zonas[3];
/*Residencias*/
datos_residencias=new Residencias(n_residencias).Residencias_ICK();
id_residencias=datos_residencias[0];
direcciones_residencias=datos_residencias[1];
/*Escuelas*/
datos_escuelas=new Escuelas(n_escuelas).Escuelas_ICK()
id_escuelas=datos_escuelas[0]
direcciones_escuelas=datos_escuelas[1]
/*Estudiantes*/
let datos_estudiantes=new Estudiantes().Estudiantes_ESGEJADRP()[0];
let dataframe=[["ID Localidad","Calles Localidad","Carreras Localidad","ID Zona",
           "Calles Zona","Carreras Zona","Factores de riesgo","ID Residencia",
           "Dirección Residencia","ID Escuela","Dirección Escuela","Edad","Sexo",
           "Género","Etnia","JornadaE","Ausencia","Disciplina",
           "RelacionesI","PresenciaP"]];
let fila=1
let zona=0
for (var i=0;i<n_localidades;i++){
    for (var j=0;j<n_zonas;j++){
        for(var k=0;k<n_residencias;k++){
            var filas=[];
            filas.push(id_localidades[i]);
            filas.push("Calles entre "+(calles_localidades[i]).toString());
            filas.push("Carreras entre "+(carreras_localidades[i]).toString());
            filas.push(id_zonas[zona]);
            filas.push("Calles entre "+(calles_zonas[i][j]).toString());
            filas.push("Carreras entre "+(carreras_zonas[i][j]).toString());
            filas.push(factores_riesgo[i][j].join(","));
            filas.push(id_residencias[fila-1]);
            filas.push(direcciones_residencias[i][j][k]);
            var escuela_aleatoria=randint(0,(id_escuelas.length)-1);
            filas.push(id_escuelas[escuela_aleatoria]);
            filas.push(direcciones_escuelas[escuela_aleatoria]);
            for (var l=0;l<datos_estudiantes[fila-1].length;l++){
                 filas.push(datos_estudiantes[fila-1][l]);
            }
            fila+=1;
            dataframe.push(filas);
        }
        zona+=1;
    }
}
console.log(dataframe);