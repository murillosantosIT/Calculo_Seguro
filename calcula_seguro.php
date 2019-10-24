<?php
    require "calcula_idade.php";
    $valorBase = $_POST["vlVeiculo"]*0.03;

    $resultadoIdade = calculo_idade($_POST["dtNascimento"]);
    
    if($resultadoIdade<18)
    {
        $erro_idade = true;

        echo $erro_idade;
    }
    else{
        if($_POST["sexo"]=="M")
        {
            $valorAcrescimo += $valorBase*0.10;
        }
        if($resultadoIdade<=25)
        {
            $valorAcrescimo += $valorBase*0.10;
        }
        else if($resultadoIdade<=30)
        {
            $valorAcrescimo += $valorBase*0.05;
        }

        else if($resultadoIdade<=35)

        {
            $valorAcrescimo += $valorBase*0.02;
        }
        $valorTotal = ($valorAcrescimo + $valorBase);
        
        echo $valorTotal;
    }
    
?>