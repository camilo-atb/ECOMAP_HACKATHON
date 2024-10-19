import pandas as pd
import cufflinks as cf
from IPython.display import display, HTML # IPython.display es un módulo que proporciona herramientas para mostrar contenido en entornos interactivos, como Jupyter Notebooks.
import plotly.offline as pyo # Importar plotly para graficar

cf.set_config_file(sharing="public", theme="white", offline=True) # que sea compartido publico, que el tema sea blanco, y que va a estar en modo offline

# ======================== BOYACÁ ===========================

df = pd.read_csv("Boya-Cundi/graficos/municipios_boyaca.csv")
#print(df)

df_amenazados_boyaca = pd.read_csv("Boya-Cundi/graficos/municipios_boyaca.csv")

df_amenazados_boyaca.dropna() # borramos valores nulos

# Crear la tabla pivote
df_pivot = df_amenazados_boyaca.pivot_table(
    index='Municipio', 
    columns='Categoría', 
    values='Cantidad_Especies', 
    aggfunc='sum'  # o 'count', dependiendo de tus necesidades
)

# Filtrar los municipios 
municipios_deseados = ["Garagoa", "Duitama", "Mongua", "Paipa", "Puerto Boyacá", "Santa María", "Soatá", "Villa de Leyva"]
df_pivot_filtered = df_pivot.loc[municipios_deseados]

# Verificar que el dataframe filtrado no esté vacío
#print(df_pivot_filtered)

# Graficar
fig = df_pivot_filtered.iplot(kind="line", asFigure=True, xTitle="Municipio", yTitle="Cantidad de Especies", title="Municipios vs Cantidad de Especies Amenazadas")  # Crear figura
#pyo.plot(fig, filename='Boya-Cundi/graficos/grafico_municipal_boyaca.html', auto_open=True)  # Guardar y abrir en el navegador

# ================ DUITAMA =================

# Barplot

"""
df_municipio_duitama = df_pivot_filtered[df_pivot_filtered.index.isin(["Duitama"])]
df_municipio_duitama = df_municipio_duitama.T
fig_duitama = df_municipio_duitama.iplot(kind="bar", asFigure=True, xTitle="Categoría", yTitle="Cantidad de Especies Amenazadas", title="Cantidad de Especies Amenazadas en Duitama \nRespecto a la Categoria")
pyo.plot(fig_duitama, filename='Boya-Cundi/graficos/grafico_duitama.html', auto_open=True)  # Guardar y abrir en el navegador
"""
# Filtrar datos para Duitama
df_municipio_duitama = df_pivot_filtered[df_pivot_filtered.index.isin(["Duitama"])]
df_municipio_duitama = df_municipio_duitama.T

# Crear el gráfico
fig_duitama = df_municipio_duitama.iplot(
    kind="bar",
    asFigure=True,
    xTitle="Categoría",
    yTitle="Cantidad de Especies Amenazadas",
    title="Cantidad de Especies Amenazadas en Duitama Respecto a la Categoria"  # Título inicial
)

# Actualizar el diseño para manejar el título en múltiples líneas
fig_duitama.update_layout(
    title=dict(
        text="Cantidad de Especies Amenazadas en Duitama<br>Respecto a la Categoria",  # Usar <br> para saltos de línea
        font=dict(size=16),  # Tamaño de fuente opcional
        x=0.5,  # Centrar el título
        y=0.95  # Ajustar la posición vertical
    )
)

# Guardar y abrir el gráfico
import plotly.offline as pyo
#pyo.plot(fig_duitama, filename='Boya-Cundi/graficos/grafico_duitama.html', auto_open=True)

# ================ VILLA DE LEYVA =================

"""
# Barplot
df_municipio_villa_de_leyva = df_pivot_filtered[df_pivot_filtered.index.isin(["Villa de Leyva"])]
df_municipio_villa_de_leyva = df_municipio_villa_de_leyva.T # se utiliza para transponer el DataFrame en pandas. Al transponer, las filas se convierten en columnas y viceversa.
fig_villa_de_leyva = df_municipio_villa_de_leyva.iplot(kind="bar", asFigure=True, xTitle="Categoría", yTitle="Cantidad de Especies Amenazadas", title="Cantidad de Especies Amenazadas en Villa de Leyva \nRespecto a la Categoria")
pyo.plot(fig_villa_de_leyva, filename='Boya-Cundi/graficos/grafico_villa_leyva.html', auto_open=True)  # Guardar y abrir en el navegador
"""
# Crea el gráfico con iplot
df_municipio_villa_de_leyva = df_pivot_filtered[df_pivot_filtered.index.isin(["Villa de Leyva"])]
df_municipio_villa_de_leyva = df_municipio_villa_de_leyva.T
fig_villa_de_leyva = df_municipio_villa_de_leyva.iplot(
    kind="bar",
    asFigure=True,
    xTitle="Categoría",
    yTitle="Cantidad de Especies Amenazadas",
    title="Cantidad de Especies Amenazadas en Villa de Leyva Respecto a la Categoria"
)

# Luego, actualiza el diseño para incluir el salto de línea
fig_villa_de_leyva.update_layout(
    title=dict(
        text="Cantidad de Especies Amenazadas en Villa de Leyva<br>Respecto a la Categoria",  # Usa <br> para saltos de línea
        font=dict(size=16),  # Tamaño de fuente opcional
        x=0.5,  # Centrar el título
        y=0.95  # Ajusta la posición vertical
    )
)

# Ahora, guarda y abre el gráfico
import plotly.offline as pyo
#pyo.plot(fig_villa_de_leyva, filename='Boya-Cundi/graficos/grafico_villa_leyva.html', auto_open=True)

# MIN 17 https://www.youtube.com/watch?v=Zt3tzGjLmPA&list=LL&index=13

# ======================== CUNDINAMARCA ===========================

df = pd.read_csv("Boya-Cundi/graficos/municipios_boyaca.csv")
#print(df)

df_amenazados_cundinamarca = pd.read_csv("Boya-Cundi/graficos/municipios_cundinamarca.csv")
df_amenazados_cundinamarca.columns = df_amenazados_cundinamarca.columns.str.strip()
df_amenazados_cundinamarca = df_amenazados_cundinamarca.dropna() # borramos valores nulos
print(df_amenazados_cundinamarca.columns)
# Crear la tabla pivote
df_pivot = df_amenazados_cundinamarca.pivot_table(
    index='Municipio', 
    columns='Categoría', 
    values='Cantidad_Especies', 
    aggfunc='sum'
)

# Filtrar los municipios 
municipios_filtrados_cundi = ["Albán", "Arbeláez", "Bojacá", "Chía", "Cota", "Funza", "Guasca", "Pasca"]
df_pivot_filtereded = df_pivot.loc[municipios_filtrados_cundi]

# Verificar que el dataframe filtrado no esté vacío
print(df_pivot_filtereded)

# Graficar
fig = df_pivot_filtereded.iplot(kind="line", asFigure=True, xTitle="Municipio", yTitle="Cantidad de Especies", title="Municipios Cundinamarca vs Cantidad de Especies Amenazadas")  # Crear figura
#pyo.plot(fig, filename='Boya-Cundi/graficos/grafico_municipal_cundinamarca.html', auto_open=True)  # Guardar y abrir en el navegador

print(df_amenazados_cundinamarca[df_amenazados_cundinamarca['Municipio'].isin(['Cota', 'Funza'])])

# ================ COTA =================

# Barplot

# Filtrar datos para Duitama
df_municipio_cota = df_pivot_filtereded[df_pivot_filtereded.index.isin(["Cota"])]
df_municipio_cota = df_municipio_cota.T # invertir filas y columnas

# Crear el gráfico
fig_cota = df_municipio_cota.iplot(
    kind="bar",
    asFigure=True,
    xTitle="Categoría",
    yTitle="Cantidad de Especies Amenazadas",
    title="Cantidad de Especies Amenazadas en Cota Respecto a la Categoria"  # Título inicial
)
print(df_municipio_cota)
# Actualizar el diseño para manejar el título en múltiples líneas
fig_cota.update_layout(
    title=dict(
        text="Cantidad de Especies Amenazadas en Cota<br>Respecto a la Categoria",  # Usar <br> para saltos de línea
        font=dict(size=16),  # Tamaño de fuente opcional
        x=0.5,  # Centrar el título
        y=0.95  # Ajustar la posición vertical
    )
)

# Guardar y abrir el gráfico
import plotly.offline as pyo
pyo.plot(fig_cota, filename='Boya-Cundi/graficos/grafico_cota.html', auto_open=True)

# ================ FUNZA =================

# Barplot

# Crea el gráfico con iplot
df_municipio_funza = df_pivot_filtereded[df_pivot_filtereded.index.isin(["Funza"])]
df_municipio_funza = df_municipio_funza.T

fig_funza = df_municipio_funza.iplot(
    kind="bar",
    asFigure=True,
    xTitle="Categoría",
    yTitle="Cantidad de Especies Amenazadas",
    title="Cantidad de Especies Amenazadas en Funza Respecto a la Categoria"
)
print(df_municipio_funza)

# Luego, actualiza el diseño para incluir el salto de línea
fig_funza.update_layout(
    title=dict(
        text="Cantidad de Especies Amenazadas en Funza<br>Respecto a la Categoria",  # Usa <br> para saltos de línea
        font=dict(size=16),  # Tamaño de fuente opcional
        x=0.5,  # Centrar el título
        y=0.95  # Ajusta la posición vertical
    )
)

# Ahora, guarda y abre el gráfico
import plotly.offline as pyo
pyo.plot(fig_funza, filename='Boya-Cundi/graficos/grafico_funza.html', auto_open=True)
