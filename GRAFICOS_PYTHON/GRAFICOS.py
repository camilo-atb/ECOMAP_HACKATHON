import pandas as pd
import cufflinks as cf
from IPython.display import display, HTML 
import plotly.offline as pyo
import plotly.express as px

cf.set_config_file(sharing="public", theme="white", offline=True)  # Tema blanco, público y offline

# ======================== BOGOTÁ ===========================

df_solicitudes_bogota = pd.read_csv("BOGOTA.csv")

# Borrar valores nulos
df_solicitudes_bogota.dropna(inplace=True)

# Crear la tabla pivote
df_pivot = df_solicitudes_bogota.pivot_table(
    index='Localidad',  # Usamos 'Localidad' como índice
    columns='Materiales',
    values='Solicitudes',  # Usamos 'Solicitudes' como valores
    aggfunc='sum'  # Sumar las solicitudes
)

df_pivot_filtered = df_pivot

# Grafico
# fig = df_pivot_filtered.iplot(kind="bar", asFigure=True, xTitle="Localidad", yTitle="Solicitudes", title="Localidad vs Solicitudes")
# pyo.plot(fig, filename='GRAFICOS/grafico1.html', auto_open=True)  # Guardar y abrir en el navegador

# =================================================================

# MAPA DE CALOR

df_pivot_reset = df_pivot.reset_index()

fig = px.imshow(df_pivot_reset.set_index('Localidad').T,  # Transponemos para que los materiales estén en el eje Y
                color_continuous_scale="Viridis",  # Escala de colores tipo "Viridis"
                labels={'x': 'Localidad', 'y': 'Materiales', 'color': 'Solicitudes'},  # Etiquetas
                title="Mapa de calor de Solicitudes por Localidad y Material"
)

# Guardar el gráfico como un archivo HTML
#fig.write_html('GRAFICOS/mapa_calor_heatmap.html')

# Mostrar el gráfico
#fig.show()

# ============================================================================

# ============================= GRAFICOS MEDELLÍN =============================

df_solicitudes_medellin = pd.read_csv("MEDELLIN.csv")

# Borrar valores nulos
df_solicitudes_medellin.dropna(inplace=True)

# Crear la tabla pivote
df_pivote = df_solicitudes_medellin.pivot_table(
    index='Comuna', 
    columns='Materiales',
    values='Solicitudes',  
    aggfunc='sum'  # Sumar las solicitudes
)

df_pivot_filtered2 = df_pivote

# Grafico
#fig = df_pivot_filtered2.iplot(kind="bar", asFigure=True, xTitle="Comuna", yTitle="Solicitudes", title="Comuna vs Solicitudes")
#pyo.plot(fig, filename='GRAFICOS/grafico2.html', auto_open=True)  # Guardar y abrir en el navegador

# =================================================================

# MAPA DE CALOR

df_pivote_reset = df_pivote.reset_index()

fig = px.imshow(df_pivote_reset.set_index('Comuna').T,  # Transponemos para que los materiales estén en el eje Y
                color_continuous_scale="Viridis",  # Escala de colores tipo "Viridis"
                labels={'x': 'Comuna', 'y': 'Materiales', 'color': 'Solicitudes'},  # Etiquetas
                title="Mapa de calor de Solicitudes por Comuna y Material"
)

# Guardar el gráfico como un archivo HTML
#fig.write_html('GRAFICOS/mapa_calor_heatmap.html')

# Mostrar el gráfico
#fig.show()


# ============================================================================

# ============================= GRAFICOS COSTA =============================

df_solicitudes_costa = pd.read_csv("COSTA.csv")

# Borrar valores nulos
df_solicitudes_costa.dropna(inplace=True)

# Crear la tabla pivote
df_pivote2 = df_solicitudes_costa.pivot_table(
    index='Zona', 
    columns='Materiales',
    values='Solicitudes',  
    aggfunc='sum'  # Sumar las solicitudes
)

df_pivot_filtered3 = df_pivote2

# Grafico
fig = df_pivot_filtered3.iplot(kind="bar", asFigure=True, xTitle="Zona", yTitle="Solicitudes", title="Zona vs Solicitudes")
pyo.plot(fig, filename='GRAFICOS/grafico3.html', auto_open=True)  # Guardar y abrir en el navegador

# =================================================================

# MAPA DE CALOR

df_pivote_reset2 = df_pivote2.reset_index()

fig = px.imshow(df_pivote_reset2.set_index('Zona').T,  # Transponemos para que los materiales estén en el eje Y
                color_continuous_scale="Viridis",  # Escala de colores tipo "Viridis"
                labels={'x': 'Zona', 'y': 'Materiales', 'color': 'Solicitudes'},  # Etiquetas
                title="Mapa de calor de Solicitudes por Zona y Material"
)

# Guardar el gráfico como un archivo HTML
fig.write_html('GRAFICOS/grafico3.mapa_calor_heatmap.html')

# Mostrar el gráfico
fig.show()



