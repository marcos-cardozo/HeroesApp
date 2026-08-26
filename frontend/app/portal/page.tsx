/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { createPortal } from "react-dom";
import { useEffect, useRef, useState, FormEvent } from "react";
import { toPng } from "html-to-image";
import { AuthGuard } from "@/components/AuthGuard";
import { AppHeader } from "@/components/AppHeader";
import { portalApi } from "@/lib/api";
import {
  MoodBoardImage,
  KeyBelief,
  PortalSlide,
  PortalNarrative,
} from "@/lib/types";

// Importaciones para Drag & Drop
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

/* eslint-disable @next/next/no-img-element */

/* ---------------- MODAL DE LINK ---------------- */
function LinkModal({
  onClose,
  onSubmit,
  returnFocusRef,
  title = "AGREGAR LINK",
  submitLabel = "Agregar al mood board",
  submitLabelSaving = "Agregando...",
  errorMessage = "No se pudo agregar la imagen. Intentá de nuevo.",
  initialValue = "",
}: {
  onClose: () => void;
  onSubmit: (url: string) => Promise<void>;
  returnFocusRef?: React.RefObject<HTMLElement | null>;
  title?: string;
  submitLabel?: string;
  submitLabelSaving?: string;
  errorMessage?: string;
  initialValue?: string;
}) {
  const [link, setLink] = useState(initialValue);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  const panelRef = useRef<HTMLDivElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);

  const handleSave = async () => {
    const trimmed = link.trim();
    if (!trimmed || saving) return;

    setSaving(true);
    setError(null);

    try {
      await onSubmit(trimmed);
      onClose();
    } catch {
      setError(errorMessage);
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    const raf = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    firstFieldRef.current?.focus();

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEsc);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleEsc);

      const target =
        returnFocusRef?.current ??
        (document.activeElement as HTMLElement | null);

      target?.focus?.();
    };
  }, [onClose, returnFocusRef]);

  return (
    <div
      className="fixed! inset-0! z-[9999]! flex items-center justify-center p-4"
      style={{
        background: "rgba(0,0,0,.65)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        opacity: mounted ? 1 : 0,
        transition: "opacity .18s",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={panelRef}
        className="quest-panel relative w-full max-w-2xl rounded-2xl! p-4 sm:p-6 md:p-8"
        style={{
          border: "1px solid var(--gold-dim)",
          transform: mounted ? "scale(1)" : "scale(.96)",
          opacity: mounted ? 1 : 0,
          transition: "all .18s",
          maxHeight: "90vh",
          overflow: "auto",
        }}
      >
        <span className="bracket-tl" />
        <span className="bracket-tr" />
        <span className="bracket-bl" />
        <span className="bracket-br" />

        <div className="flex justify-between items-center mb-4 sm:mb-5">
          <h3
            className="font-mono text-xs sm:text-sm tracking-[0.2em] uppercase"
            style={{ color: "var(--gold)" }}
          >
            — {title}
          </h3>

          <button
            onClick={onClose}
            className="group relative text-sm px-3 py-2 rounded-xl transition-all duration-300 hover:rotate-90 hover:scale-110 cursor-pointer"
            style={{ color: "var(--parchment-muted)" }}
            aria-label="Cerrar"
          >
            <span className="relative z-10">✕</span>
            <span
              className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: "rgba(255, 68, 68, 0.15)",
                boxShadow: "0 0 20px rgba(255, 68, 68, 0.3)",
                border: "1px solid rgba(255, 68, 68, 0.4)",
              }}
            />
          </button>
        </div>

        <input
          ref={firstFieldRef}
          value={link}
          onChange={(e) => setLink(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSave()}
          placeholder="https://..."
          className="quest-input w-full px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl! text-sm sm:text-base mb-4 sm:mb-6"
        />

        {error && (
          <p className="text-sm mb-4 sm:mb-5" style={{ color: "var(--blood)" }}>
            {error}
          </p>
        )}

        <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3">
          <button
            onClick={handleSave}
            disabled={saving || !link.trim()}
            className="quest-btn-retro cursor-pointer w-full sm:w-auto"
          >
            {saving ? submitLabelSaving : submitLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------------- MODAL DE CREACIÓN DE SLIDE ---------------- */
function CreateSlideModalContent({
  slides,
  setSlides,
  onClose,
  onCreated,
}: {
  slides: PortalSlide[];
  setSlides: React.Dispatch<React.SetStateAction<PortalSlide[]>>;
  onClose: () => void;
  onCreated: (id: string) => void;
}) {
  const [mounted, setMounted] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLSelectElement>(null);

  const [category, setCategory] = useState("");
  const [text, setText] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [images, setImages] = useState<(string | null)[]>(Array(4).fill(null));
  const [activeSlot, setActiveSlot] = useState<number | null>(null);

  const SLIDE_CATEGORIES = ["YO", "PROPOSITO", "PAREJA", "TEMPLO", "AMIGOS", "HOBBIES"];

  useEffect(() => {
    const raf = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    setTimeout(() => firstInputRef.current?.focus(), 100);

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEsc);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  const handleCreate = async () => {
    if (!category) {
      setError("Seleccioná una categoría.");
      return;
    }

    if (!text.trim()) {
      setError("El texto narrativo es requerido.");
      return;
    }

    setSaving(true);
    setError(null);

    try {
      const created = await portalApi.createSlide(
        category,
        text.trim(),
        slides.length,
      );

      for (let i = 0; i < images.length; i++) {
        if (images[i]) {
          await portalApi.addSlideImage(created.id, images[i]!, i);
        }
      }

      const updated = await portalApi.getSlides();
      setSlides(updated);
      onCreated(created.id);
      onClose();
    } catch (err: any) {
      setError(
        err?.response?.data?.message?.[0] ?? "No se pudo crear la slide.",
      );
    } finally {
      setSaving(false);
    }
  };

  const handleAddImage = async (url: string): Promise<void> => {
    if (activeSlot !== null) {
      const copy = [...images];
      copy[activeSlot] = url;
      setImages(copy);
      setActiveSlot(null);
    }
  };

  return (
    <div
      ref={panelRef}
      className="quest-panel relative w-full max-w-3xl rounded-2xl! p-4 sm:p-6"
      style={{
        border: "1px solid var(--gold-dim)",
        transform: mounted ? "scale(1)" : "scale(.96)",
        opacity: mounted ? 1 : 0,
        transition: "all .18s",
        maxHeight: "90vh",
        overflow: "auto",
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <span className="bracket-tl" />
      <span className="bracket-tr" />
      <span className="bracket-bl" />
      <span className="bracket-br" />

      <div className="flex justify-between items-center mb-4 sm:mb-5">
        <h3
          className="font-mono text-xs sm:text-sm tracking-[0.2em] uppercase"
          style={{ color: "var(--gold)" }}
        >
          — NUEVA SLIDE
        </h3>

        <button
          onClick={onClose}
          className="group relative text-sm px-3 py-2 rounded-xl transition-all duration-300 hover:rotate-90 hover:scale-110 cursor-pointer"
          style={{ color: "var(--parchment-muted)" }}
          aria-label="Cerrar"
        >
          <span className="relative z-10">✕</span>
          <span
            className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: "rgba(255, 68, 68, 0.15)",
              boxShadow: "0 0 20px rgba(255, 68, 68, 0.3)",
              border: "1px solid rgba(255, 68, 68, 0.4)",
            }}
          />
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 lg:gap-5">
        <div className="flex-1">
          <label
            className="block font-mono text-xs tracking-widest mb-1.5"
            style={{ color: "var(--parchment-muted)" }}
          >
            CATEGORÍA
          </label>

          <select
            ref={firstInputRef}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="quest-input w-full px-3 py-2 rounded-2xl! mb-4 text-sm cursor-pointer"
          >
            <option value="">Seleccionar</option>
            {SLIDE_CATEGORIES.map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>

          <label
            className="block font-mono text-xs tracking-widest mb-1.5"
            style={{ color: "var(--parchment-muted)" }}
          >
            TEXTO NARRATIVO
          </label>

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="quest-input w-full px-3 py-2 rounded-2xl! min-h-48 resize-none text-sm scrollbar-violet"
            placeholder="Escribí la narrativa..."
          />
        </div>

        {/* Grid de imágenes compacto */}
        <div className="grid grid-cols-2 gap-3 w-full lg:w-64 shrink-0">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              onClick={() => setActiveSlot(i)}
              className="group relative aspect-square rounded-lg overflow-hidden cursor-pointer"
              style={{
                background: "#131315",
                border: "1px solid #232326",
              }}
            >
              {images[i] ? (
                <>
                  <img
                    src={images[i]!}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      const copy = [...images];
                      copy[i] = null;
                      setImages(copy);
                    }}
                    className="absolute top-1.5 right-1.5 z-20 h-5 w-5 sm:h-6 sm:w-6 rounded-full text-[10px] sm:text-xs font-bold opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer hover:rotate-90"
                    style={{
                      background: "var(--blood)",
                      color: "#fff",
                    }}
                    aria-label="Eliminar imagen"
                  >
                    ✕
                  </button>
                  <div
                    className="absolute inset-0 flex items-end justify-center pb-2 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(0,0,0,.8), transparent)",
                    }}
                  >
                    <span
                      className="font-mono text-[8px] sm:text-[10px] uppercase"
                      style={{ color: "#F2F0EB" }}
                    >
                      Reemplazar
                    </span>
                  </div>
                </>
              ) : (
                <div className="h-full flex flex-col items-center justify-center gap-1">
                  <span
                    className="text-xl sm:text-2xl"
                    style={{ color: "#7C6CFF" }}
                  >
                    +
                  </span>
                  <span
                    className="font-mono text-[8px] sm:text-[10px] uppercase"
                    style={{ color: "#8A8A8F" }}
                  >
                    Agregar
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {error && (
        <p className="text-sm mt-4" style={{ color: "var(--blood)" }}>
          {error}
        </p>
      )}

      <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 mt-5">
        <button
          onClick={onClose}
          className="group relative px-5 py-2.5 text-sm rounded-xl transition-all duration-300 hover:-translate-y-0.5 cursor-pointer w-full sm:w-auto"
          style={{ color: "var(--parchment-muted)" }}
        >
          <span className="relative z-10">Cancelar</span>
          <span
            className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300"
            style={{
              background: "rgba(255, 200, 50, 0.08)",
              border: "1px solid rgba(255, 200, 50, 0.3)",
              boxShadow: "0 4px 12px rgba(255, 200, 50, 0.1)",
            }}
          />
        </button>

        <button
          onClick={handleCreate}
          disabled={saving}
          className="quest-btn-retro quest-btn-retro-small cursor-pointer w-full sm:w-auto"
        >
          {saving ? "Creando..." : "Crear slide"}
        </button>
      </div>

      {activeSlot !== null &&
        createPortal(
          <div
            className="fixed! inset-0! z-[99999]! flex items-center justify-center p-4"
            style={{
              background: "rgba(0,0,0,.65)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
            }}
            onClick={(e) => {
              if (e.target === e.currentTarget) setActiveSlot(null);
            }}
          >
            <LinkModal
              title="AGREGAR IMAGEN"
              submitLabel="Agregar imagen"
              submitLabelSaving="Agregando..."
              errorMessage="No se pudo agregar la imagen."
              onClose={() => setActiveSlot(null)}
              onSubmit={handleAddImage}
            />
          </div>,
          document.body,
        )}
    </div>
  );
}

/* ---------------- COMPONENTE PARA ÍTEMS ARRASTRABLES ---------------- */
function SortableBeliefItem({
  belief,
  index,
  onEdit,
  onDelete,
  isEditing,
  draft,
  setDraft,
  commitEdit,
}: {
  belief: KeyBelief;
  index: number;
  onEdit: (b: KeyBelief) => void;
  onDelete: (id: string) => void;
  isEditing: boolean;
  draft: string;
  setDraft: (value: string) => void;
  commitEdit: (b: KeyBelief) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: belief.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      className={`flex items-center gap-2 sm:gap-3 p-1.5 sm:p-2 rounded-2xl transition-colors ${
        isDragging ? "ring-2 ring-violet-500" : ""
      }`}
      {...attributes}
    >
      <div
        {...listeners}
        className="cursor-grab active:cursor-grabbing text-base sm:text-lg select-none hover:text-gold transition-colors flex-shrink-0"
        style={{ color: "var(--parchment-muted)" }}
        title="Arrastrar para reordenar"
      >
        ⋮⋮
      </div>

      <span
        className="font-display w-5 sm:w-6 text-right flex-shrink-0 text-sm sm:text-base"
        style={{ color: "var(--gold)" }}
      >
        {index + 1}.
      </span>

      {isEditing ? (
        <input
          autoFocus
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={() => commitEdit(belief)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              (e.target as HTMLInputElement).blur();
            }
          }}
          className="quest-input flex-1 px-2 sm:px-3 py-1 sm:py-1.5 rounded-2xl text-xs sm:text-sm"
        />
      ) : (
        <span
          onClick={() => onEdit(belief)}
          className="flex-1 cursor-text px-1 py-1 text-xs sm:text-sm"
          style={{ color: "var(--parchment)" }}
        >
          {belief.text || (
            <span style={{ color: "var(--parchment-muted)" }}>
              (vacío — click para editar)
            </span>
          )}
        </span>
      )}

      <button
        type="button"
        onClick={() => onDelete(belief.id)}
        className="group relative text-xs sm:text-sm px-1.5 sm:px-2 py-1 rounded-xl flex-shrink-0 transition-all duration-300 hover:rotate-90 hover:scale-110 cursor-pointer"
        style={{ color: "var(--blood)" }}
        aria-label="Eliminar creencia"
      >
        <span className="relative z-10">✕</span>
        <span
          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: "rgba(255, 68, 68, 0.1)",
          }}
        />
      </button>
    </li>
  );
}

/* ---------------- SECCIÓN 2 — 10 CREENCIAS CLAVE (CON DRAG & DROP) ---------------- */
function BeliefsSection({
  beliefs,
  setBeliefs,
}: {
  beliefs: KeyBelief[];
  setBeliefs: React.Dispatch<React.SetStateAction<KeyBelief[]>>;
}) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState("");
  const [newText, setNewText] = useState("");
  const [adding, setAdding] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const startEdit = (b: KeyBelief) => {
    setEditingId(b.id);
    setDraft(b.text);
  };

  const commitEdit = async (b: KeyBelief) => {
    const text = draft.trim();
    setEditingId(null);
    if (text === "" || text === b.text) return;
    setBeliefs((prev) =>
      prev.map((it) => (it.id === b.id ? { ...it, text } : it)),
    );
    try {
      await portalApi.updateBelief(b.id, { text });
    } catch {
      /* ignore */
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await portalApi.deleteBelief(id);
      setBeliefs((prev) => prev.filter((it) => it.id !== id));
    } catch {
      /* ignore */
    }
  };

  const handleAdd = async (e: FormEvent) => {
    e.preventDefault();
    const text = newText.trim();
    if (!text) return;
    setAdding(true);
    try {
      const created = await portalApi.addBelief(text, beliefs.length);
      setBeliefs((prev) => [...prev, created]);
      setNewText("");
    } catch {
      /* ignore */
    } finally {
      setAdding(false);
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = beliefs.findIndex((item) => item.id === active.id);
      const newIndex = beliefs.findIndex((item) => item.id === over.id);

      const newOrder = arrayMove(beliefs, oldIndex, newIndex);
      setBeliefs(newOrder);

      try {
        await (portalApi as any).reorderBeliefs?.(
          newOrder.map((item) => item.id),
        );
      } catch {
        setBeliefs(arrayMove(newOrder, newIndex, oldIndex));
      }
    }
  };

  return (
    <section className="portal-glow p-2 -m-2">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0 mb-4">
        <h2
          className="font-mono text-sm sm:text-base tracking-[0.2em] uppercase"
          style={{ color: "var(--gold)" }}
        >
          — 10 CREENCIAS CLAVE
        </h2>

        <div className="flex flex-wrap items-center justify-end gap-2 w-full sm:w-auto">
          <span
            className="font-mono text-xs px-3 py-1 rounded-full"
            style={{
              background: "rgba(124,108,255,0.15)",
              border: "1px solid rgba(124,108,255,0.2)",
              color: "var(--gold)",
            }}
          >
            {beliefs.length}/10
          </span>
        </div>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={beliefs.map((b) => b.id)}
          strategy={verticalListSortingStrategy}
        >
          <ol className="space-y-1.5 sm:space-y-2">
            {beliefs.map((b, i) => (
              <SortableBeliefItem
                key={b.id}
                belief={b}
                index={i}
                onEdit={startEdit}
                onDelete={handleDelete}
                isEditing={editingId === b.id}
                draft={draft}
                setDraft={setDraft}
                commitEdit={commitEdit}
              />
            ))}
          </ol>
        </SortableContext>
      </DndContext>

      <form
        onSubmit={handleAdd}
        className="flex flex-col sm:flex-row gap-2 mt-4"
      >
        <input
          type="text"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          placeholder="Nueva creencia"
          className="quest-input flex-1 px-4 py-2 rounded-2xl! text-sm"
          disabled={beliefs.length >= 10}
        />
        <button
          type="submit"
          disabled={adding || beliefs.length >= 10}
          className="quest-btn-retro quest-btn-retro-small cursor-pointer w-full sm:w-auto"
        >
          {beliefs.length >= 10 ? "Completo ✓" : "Agregar"}
        </button>
      </form>

      {beliefs.length >= 10 && (
        <p
          className="text-xs mt-2 text-center sm:text-left"
          style={{ color: "var(--gold)" }}
        >
          ✦ Has completado las 10 creencias clave
        </p>
      )}
    </section>
  );
}

/* ---------------- SECCIÓN 1 — MOOD BOARD ---------------- */
const TOTAL_SLOTS: number = 8;

function MoodBoardSection({
  moodBoard,
  setMoodBoard,
}: {
  moodBoard: MoodBoardImage[];
  setMoodBoard: React.Dispatch<React.SetStateAction<MoodBoardImage[]>>;
}) {
  const gridRef = useRef<HTMLDivElement>(null);
  const linkButtonRef = useRef<HTMLButtonElement>(null);
  const [showNotification, setShowNotification] = useState(false);

  const [linkModalTarget, setLinkModalTarget] = useState<
    { mode: "add"; order: number } | { mode: "replace"; id: string } | null
  >(null);

  useEffect(() => {
    if (showNotification) {
      const timer = setTimeout(() => {
        setShowNotification(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showNotification]);

  // 🔥 FUNCIÓN DE DESCARGA SIMPLIFICADA (SIN FETCH A PINTEREST)
  const handleDownload = async () => {
    if (!gridRef.current) return;

    // 🔥 RESPALDO Y SOBRESCRITURA DEFINITIVA DE console.error
    const originalConsoleError = console.error;
    console.error = (...args: any[]) => {
      const errorString = JSON.stringify(args);
      // Ignoramos cualquier error que hable de "fetch", "CORS", "pinterest" o "cross-origin"
      if (
        errorString.includes("fetch") ||
        errorString.includes("CORS") ||
        errorString.includes("pinterest") ||
        errorString.includes("cross-origin") ||
        errorString.includes("ERR_FAILED")
      ) {
        return;
      }
      originalConsoleError(...args);
    };

    try {
      // Clonamos el nodo para no modificar el original
      const cloneNode = gridRef.current.cloneNode(true) as HTMLElement;

      // Eliminamos botones y overlays del clon
      cloneNode.querySelectorAll(".z-20, .z-10").forEach((el) => el.remove());

      // Aplicamos estilos para que se vea bien
      cloneNode.style.backgroundColor = "#0b0a10";
      cloneNode.style.padding = "0px";

      // Generamos el PNG
      const dataUrl = await toPng(cloneNode, {
        cacheBust: true,
        skipAutoScale: true,
        pixelRatio: 2,
        style: {
          borderRadius: "0px",
        },
        filter: (node) => {
          return !node.classList?.contains("z-20") && !node.classList?.contains("z-10");
        },
      });

      // Descargamos el archivo
      const link = document.createElement("a");
      link.download = "mood-board.png";
      link.href = dataUrl;
      link.click();

    } catch (error) {
      // Solo mostramos errores que no sean de CORS
      if (!String(error).includes("CORS") && !String(error).includes("fetch")) {
        console.error("Error al descargar la imagen:", error);
      }
    } finally {
      // Restauramos el console.error original
      console.error = originalConsoleError;
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await portalApi.deleteMoodBoardImage(id);
      setMoodBoard((prev) => prev.filter((img) => img.id !== id));
    } catch {
      /* ignore */
    }
  };

  const handleAddImage = async (url: string, order: number) => {
    const created = await portalApi.addMoodBoardImage(url, order);
    setMoodBoard((prev) => [...prev, created]);

    if (moodBoard.length + 1 >= TOTAL_SLOTS) {
      setShowNotification(true);
    }
  };

  const handleReplaceImage = async (id: string, url: string) => {
    const updated = await portalApi.updateMoodBoardImage(id, { imageUrl: url });
    setMoodBoard((prev) => prev.map((it) => (it.id === id ? updated : it)));
  };

  return (
    <section className="portal-glow p-2 -m-2 relative">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0 mb-4">
        <h2
          className="font-mono text-sm sm:text-base tracking-[0.2em] uppercase"
          style={{ color: "var(--gold)" }}
        >
          — MOOD BOARD
        </h2>
        <div className="flex flex-wrap items-center justify-end gap-2 sm:gap-3 w-full sm:w-auto">
          {/* Contador de imágenes */}
          <span
            className="font-mono text-xs px-3 py-1 rounded-full transition-all duration-300"
            style={{
              background:
                moodBoard.length >= TOTAL_SLOTS
                  ? "rgba(50, 255, 150, 0.15)"
                  : "rgba(124,108,255,0.15)",
              border:
                moodBoard.length >= TOTAL_SLOTS
                  ? "1px solid rgba(50, 255, 150, 0.3)"
                  : "1px solid rgba(124,108,255,0.2)",
              color:
                moodBoard.length >= TOTAL_SLOTS ? "#32FF96" : "var(--gold)",
              transform: `scale(${moodBoard.length >= TOTAL_SLOTS ? 1.05 : 1})`,
            }}
          >
            {moodBoard.length}/{TOTAL_SLOTS}
          </span>

          {moodBoard.length >= TOTAL_SLOTS && (
            <span
              className="font-mono text-xs px-3 py-1 rounded-full"
              style={{
                background: "rgba(50, 255, 150, 0.1)",
                border: "1px solid rgba(50, 255, 150, 0.2)",
                color: "#32FF96",
              }}
            >
              ✓ Completo
            </span>
          )}

          <button
            ref={linkButtonRef}
            type="button"
            onClick={handleDownload}
            className="quest-btn-retro quest-btn-retro-small cursor-pointer text-xs sm:text-sm"
          >
            Descargar PNG
          </button>
        </div>
      </div>

      {/* 👈 Grid siempre de 4 columnas en todos los dispositivos */}
      <div ref={gridRef} className="grid grid-cols-4 gap-2 sm:gap-4">
        {Array.from({ length: TOTAL_SLOTS }).map((_, index) => {
          const img = moodBoard[index];

          return (
            <div
              key={index}
              className="group relative aspect-[9/16] rounded-xl sm:rounded-2xl overflow-hidden transition-shadow duration-300 hover:shadow-[0_0_28px_rgba(124,108,255,0.35)]"
            >
              {img ? (
                <>
                  <img
                    src={img.imageUrl}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                    style={{ border: "1px solid #232326" }}
                  />
                  <button
                    type="button"
                    onClick={() => handleDelete(img.id)}
                    className="absolute top-1.5 sm:top-2 right-1.5 sm:right-2 z-20 flex items-center justify-center h-5 w-5 sm:h-6 sm:w-6 rounded-full text-[8px] sm:text-xs font-bold opacity-0 scale-90 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100 cursor-pointer hover:rotate-90"
                    style={{ background: "var(--blood)", color: "#fff" }}
                    aria-label="Eliminar imagen"
                  >
                    ✕
                  </button>
                  <div
                    className="absolute inset-0 z-10 flex items-end justify-center pb-2 sm:pb-3 cursor-pointer opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(10,10,11,0.8), rgba(10,10,11,0) 55%)",
                    }}
                    onClick={() =>
                      setLinkModalTarget({ mode: "replace", id: img.id })
                    }
                  >
                    <span
                      className="font-mono text-[8px] sm:text-xs tracking-widest uppercase"
                      style={{ color: "#F2F0EB" }}
                    >
                      Reemplazar
                    </span>
                  </div>
                </>
              ) : (
                <div
                  className="h-full w-full flex flex-col items-center justify-center cursor-pointer transition-colors rounded-xl sm:rounded-2xl"
                  style={{
                    background: "#131315",
                    border: "1px solid #232326",
                    color: "#8A8A8F",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.borderColor = "#7C6CFF")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.borderColor = "#232326")
                  }
                  onClick={() =>
                    setLinkModalTarget({ mode: "add", order: index })
                  }
                >
                  <span
                    className="text-2xl sm:text-3xl mb-1 sm:mb-1.5"
                    style={{ color: "#7C6CFF" }}
                  >
                    +
                  </span>
                  <span className="font-mono text-[8px] sm:text-xs tracking-widest uppercase text-center px-1">
                    Agregar imagen
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Notificación emergente */}
      {showNotification && (
        <div
          className="fixed bottom-4 sm:bottom-8 left-4 right-4 sm:left-1/2 sm:right-auto sm:transform sm:-translate-x-1/2 z-[99999] animate-slide-up"
          style={{
            background: "rgba(50, 255, 150, 0.08)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border: "1px solid rgba(50, 255, 150, 0.15)",
            borderRadius: "16px",
            padding: "12px 20px sm:p-4 sm:px-8",
            boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
          }}
        >
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="text-lg sm:text-xl">✨</span>
            <div className="flex-1">
              <p
                className="font-mono text-xs sm:text-sm tracking-widest uppercase"
                style={{ color: "#32FF96" }}
              >
                ¡Mood Board completo!
              </p>
              <p
                className="text-[10px] sm:text-xs mt-0.5"
                style={{ color: "var(--parchment-muted)" }}
              >
                Eliminá una imagen para agregar otra
              </p>
            </div>
            <button
              onClick={() => setShowNotification(false)}
              className="text-sm opacity-50 hover:opacity-100 transition-opacity cursor-pointer flex-shrink-0"
              style={{ color: "var(--parchment-muted)" }}
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {linkModalTarget?.mode === "add" && (
        <LinkModal
          onClose={() => setLinkModalTarget(null)}
          returnFocusRef={linkButtonRef}
          title="AGREGAR LINK"
          submitLabel="Agregar al mood board"
          submitLabelSaving="Agregando..."
          errorMessage="No se pudo agregar la imagen. Intentá de nuevo."
          onSubmit={async (url) => {
            await handleAddImage(url, linkModalTarget.order);
          }}
        />
      )}
      {linkModalTarget?.mode === "replace" && (
        <LinkModal
          onClose={() => setLinkModalTarget(null)}
          title="REEMPLAZAR IMAGEN"
          submitLabel="Reemplazar imagen"
          submitLabelSaving="Reemplazando..."
          errorMessage="No se pudo reemplazar la imagen. Intentá de nuevo."
          onSubmit={async (url) => {
            await handleReplaceImage(linkModalTarget.id, url);
          }}
        />
      )}
    </section>
  );
}

/* ---------------- SECCIÓN 3 — SLIDES ---------------- */
function SlidesSection({
  slides,
  setSlides,
}: {
  slides: PortalSlide[];
  setSlides: React.Dispatch<React.SetStateAction<PortalSlide[]>>;
}) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const MAX_SLIDES = 6; // 🔥 Límite 6

  const selectedSlide = slides.find((s) => s.id === selectedId) ?? null;

  const handleDelete = async (id: string) => {
    await portalApi.deleteSlide(id);
    setSlides((prev) => prev.filter((s) => s.id !== id));
    if (selectedId === id) setSelectedId(null);
  };

  return (
    <section className="portal-glow relative p-2 -m-2">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0 mb-4">
        <h2
          className="font-mono text-sm sm:text-base tracking-[0.2em] uppercase"
          style={{ color: "var(--gold)" }}
        >
          — SLIDES
        </h2>

        <div className="flex flex-wrap items-center justify-end gap-2 sm:gap-3 w-full sm:w-auto">
          <span
            className="font-mono text-xs px-3 py-1 rounded-full transition-all duration-300"
            style={{
              background:
                slides.length >= MAX_SLIDES
                  ? "rgba(50, 255, 150, 0.15)"
                  : "rgba(124,108,255,0.15)",
              border:
                slides.length >= MAX_SLIDES
                  ? "1px solid rgba(50, 255, 150, 0.3)"
                  : "1px solid rgba(124,108,255,0.2)",
              color: slides.length >= MAX_SLIDES ? "#32FF96" : "var(--gold)",
              transform: `scale(${slides.length >= MAX_SLIDES ? 1.05 : 1})`,
            }}
          >
            {slides.length}/{MAX_SLIDES}
          </span>

          {slides.length < MAX_SLIDES && (
            <button
              onClick={() => setShowCreate(true)}
              className="quest-btn-retro quest-btn-retro-small cursor-pointer text-xs sm:text-sm"
            >
              + Agregar
            </button>
          )}

          {slides.length >= MAX_SLIDES && (
            <span
              className="font-mono text-xs px-3 py-1 rounded-full"
              style={{
                background: "rgba(50, 255, 150, 0.1)",
                border: "1px solid rgba(50, 255, 150, 0.2)",
                color: "#32FF96",
              }}
            >
              ✓ Completo
            </span>
          )}
        </div>
      </div>

      {slides.length === 0 ? (
        <p className="text-sm" style={{ color: "var(--parchment-muted)" }}>
          Todavía no agregaste ninguna slide.
        </p>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
            {slides.map((slide) => (
              <div
                key={slide.id}
                onClick={() => setSelectedId(slide.id)}
                className={`cursor-pointer ${
                  selectedId === slide.id
                    ? "ring-2 ring-violet-500 rounded-xl sm:rounded-2xl"
                    : ""
                }`}
              >
                <SlideCardCompact
                  slide={slide}
                  onOpen={() => setSelectedId(slide.id)}
                  onDelete={() => handleDelete(slide.id)}
                />
              </div>
            ))}
          </div>

          {slides.length >= MAX_SLIDES && (
            <div
              className="mt-4 sm:mt-6 p-3 sm:p-4 rounded-xl sm:rounded-2xl text-center animate-pulse-slow"
              style={{
                background: "rgba(50, 255, 150, 0.03)",
                border: "1px solid rgba(50, 255, 150, 0.08)",
              }}
            >
              <p
                className="text-xs sm:text-sm font-mono tracking-widest uppercase"
                style={{ color: "#32FF96" }}
              >
                ✦ ¡Todas las slides completadas! ✦
              </p>
              <p
                className="text-[10px] sm:text-xs mt-1"
                style={{ color: "var(--parchment-muted)" }}
              >
                Eliminá una slide para agregar otra
              </p>
            </div>
          )}
        </>
      )}

      {showCreate &&
        createPortal(
          <div
            className="fixed! inset-0! z-[9999]! flex items-center justify-center p-4"
            style={{
              background: "rgba(0,0,0,.65)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
            }}
            onClick={(e) => {
              if (e.target === e.currentTarget) setShowCreate(false);
            }}
          >
            <CreateSlideModalContent
              slides={slides}
              setSlides={setSlides}
              onClose={() => setShowCreate(false)}
              onCreated={(id) => setSelectedId(id)}
            />
          </div>,
          document.body,
        )}

      {selectedSlide &&
        createPortal(
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
            style={{
              background: "rgba(0,0,0,0.65)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
            }}
            onClick={(e) => {
              if (e.target === e.currentTarget) setSelectedId(null);
            }}
          >
            <SlideDetailModal
              slide={selectedSlide}
              onClose={() => setSelectedId(null)}
              setSlides={setSlides}
            />
          </div>,
          document.body,
        )}
    </section>
  );
}

function SlideDetailModal({
  slide,
  onClose,
  returnFocusRef,
  setSlides,
}: {
  slide: PortalSlide;
  onClose: () => void;
  returnFocusRef?: React.RefObject<HTMLElement | null>;
  setSlides: React.Dispatch<React.SetStateAction<PortalSlide[]>>;
}) {
  const [mounted, setMounted] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setMounted(true));
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = previousOverflow;

      const target =
        returnFocusRef?.current ??
        (document.activeElement as HTMLElement | null);
      target?.focus?.();
    };
  }, [onClose, returnFocusRef]);

  const patchSlide = (data: Partial<PortalSlide>) => {
    setSlides((prev) =>
      prev.map((s) => (s.id === slide.id ? { ...s, ...data } : s)),
    );
  };

  const handleTitleBlur = async (value: string) => {
    if (value === (slide.title ?? "")) return;
    patchSlide({ title: value });
    try {
      await portalApi.updateSlide(slide.id, { title: value });
    } catch {
      /* ignore */
    }
  };

  const handleNarrativeBlur = async (value: string) => {
    if (value === (slide.narrativeText ?? "")) return;
    patchSlide({ narrativeText: value });
    try {
      await portalApi.updateSlide(slide.id, { narrativeText: value });
    } catch {
      /* ignore */
    }
  };

  const handleDeleteImage = async (imageId: string) => {
    try {
      await portalApi.deleteSlideImage(slide.id, imageId);
      patchSlide({ images: slide.images.filter((im) => im.id !== imageId) });
    } catch {
      /* ignore */
    }
  };

  const handleAddImage = async (
    url: string,
    order: number,
    existingId?: string,
  ) => {
    const trimmed = url.trim();
    if (!trimmed) return;
    try {
      if (existingId) {
        await portalApi.deleteSlideImage(slide.id, existingId);
      }
      const created = await portalApi.addSlideImage(slide.id, trimmed, order);
      patchSlide({
        images: [...slide.images.filter((im) => im.id !== existingId), created],
      });
    } catch {
      /* ignore */
    }
  };

  const images = [...(slide.images ?? [])].sort((a, b) => a.order - b.order);

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      className="quest-panel relative w-full max-w-2xl rounded-2xl! p-4 sm:p-6"
      style={{
        border: "1px solid var(--gold-dim)",
        transform: mounted ? "scale(1)" : "scale(.96)",
        opacity: mounted ? 1 : 0,
        transition: "all .18s",
        background:
          "linear-gradient(180deg, rgba(12,11,15,0.98), rgba(8,7,10,0.98))",
        boxShadow: "0 20px 50px rgba(0,0,0,0.6)",
        maxHeight: "90vh",
        overflow: "auto",
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <span className="bracket-tl" aria-hidden="true" />
      <span className="bracket-tr" aria-hidden="true" />
      <span className="bracket-bl" aria-hidden="true" />
      <span className="bracket-br" aria-hidden="true" />

      <div className="flex justify-between items-center mb-4 sm:mb-5">
        <h3
          className="font-mono text-xs sm:text-sm tracking-[0.2em] uppercase"
          style={{ color: "var(--gold)" }}
        >
          — EDITAR SLIDE
        </h3>

        <button
          onClick={onClose}
          className="group relative text-sm px-3 py-2 rounded-xl transition-all duration-300 hover:rotate-90 hover:scale-110 cursor-pointer"
          style={{ color: "var(--parchment-muted)" }}
          aria-label="Cerrar"
        >
          <span className="relative z-10">✕</span>
          <span
            className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: "rgba(255, 68, 68, 0.15)",
              boxShadow: "0 0 20px rgba(255, 68, 68, 0.3)",
              border: "1px solid rgba(255, 68, 68, 0.4)",
            }}
          />
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">
        <div className="flex-1 min-w-0">
          <input
            autoFocus
            type="text"
            defaultValue={slide.title ?? ""}
            onBlur={(e) => handleTitleBlur(e.target.value)}
            placeholder="Título de tu slide"
            className="quest-input w-full px-3 py-2 rounded-2xl mb-3 text-sm font-semibold"
          />

          <textarea
            defaultValue={slide.narrativeText ?? ""}
            onBlur={(e) => handleNarrativeBlur(e.target.value)}
            placeholder="Texto de tu slide..."
            className="quest-input w-full px-3 py-2 rounded-2xl min-h-48 sm:min-h-72 resize-none text-sm scrollbar-violet"
          />
        </div>

        <div className="grid grid-cols-2 grid-rows-2 gap-2 sm:gap-3 w-full sm:w-80 shrink-0">
          {Array.from({ length: 4 }).map((_, i) => (
            <SlideImageSlot
              key={images[i]?.id ?? `empty-${i}`}
              image={images[i]}
              order={i}
              onAdd={(url) => handleAddImage(url, i, images[i]?.id)}
              onDelete={
                images[i] ? () => handleDeleteImage(images[i].id) : undefined
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function SlideImageSlot({
  image,
  onAdd,
  onDelete,
}: {
  image?: { id: string; imageUrl: string };
  order: number;
  onAdd: (url: string) => void;
  onDelete?: () => void;
}) {
  const [editing, setEditing] = useState(false);
  const [url, setUrl] = useState("");

  const commit = () => {
    if (url.trim()) onAdd(url.trim());
    setUrl("");
    setEditing(false);
  };

  if (image) {
    return (
      <div className="group relative aspect-square rounded-lg sm:rounded-xl overflow-hidden">
        <img
          src={image.imageUrl}
          alt=""
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
          style={{ border: "1px solid #232326" }}
        />
        {onDelete && (
          <button
            type="button"
            onClick={onDelete}
            className="absolute top-1 right-1 sm:top-1.5 sm:right-1.5 z-20 flex items-center justify-center h-4 w-4 sm:h-5 sm:w-5 rounded-full text-[8px] sm:text-[10px] font-bold opacity-0 scale-90 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100 cursor-pointer hover:rotate-90"
            style={{ background: "var(--blood)", color: "#fff" }}
            aria-label="Eliminar imagen"
          >
            ✕
          </button>
        )}
        <div
          className="absolute inset-0 z-10 flex items-end justify-center pb-1.5 sm:pb-2 cursor-pointer opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "linear-gradient(to top, rgba(10,10,11,0.8), rgba(10,10,11,0) 55%)",
          }}
          onClick={() => setEditing(true)}
        >
          <span
            className="font-mono text-[8px] sm:text-[10px] tracking-widest uppercase"
            style={{ color: "#F2F0EB" }}
          >
            Reemplazar
          </span>
        </div>
        {editing && (
          <div
            className="absolute inset-0 z-30 flex flex-col gap-1.5 p-2 justify-center"
            style={{ background: "rgba(10,10,11,0.92)" }}
          >
            <input
              autoFocus
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && commit()}
              placeholder="https://..."
              className="quest-input w-full px-2 py-1 rounded-lg! text-[8px] sm:text-[10px]"
            />
            <div className="flex gap-1.5">
              <button
                type="button"
                onClick={commit}
                className="quest-btn flex-1 px-1 py-1 rounded-lg! text-[8px] sm:text-[10px] font-semibold cursor-pointer"
              >
                OK
              </button>
              <button
                type="button"
                onClick={() => {
                  setEditing(false);
                  setUrl("");
                }}
                className="group relative px-2 sm:px-3 py-1 text-[8px] sm:text-[10px] rounded-lg transition-all duration-200 hover:scale-105 cursor-pointer"
                style={{ color: "var(--parchment-muted)" }}
              >
                <span className="relative z-10">Cancelar</span>
                <span
                  className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  style={{
                    background: "rgba(255, 68, 68, 0.1)",
                    border: "1px solid rgba(255, 68, 68, 0.3)",
                  }}
                />
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (editing) {
    return (
      <div
        className="aspect-square rounded-lg sm:rounded-xl flex flex-col gap-1.5 p-2 justify-center"
        style={{ background: "rgba(10,10,11,0.92)" }}
      >
        <input
          autoFocus
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && commit()}
          placeholder="https://..."
          className="quest-input w-full px-2 py-1 rounded-lg! text-[8px] sm:text-[10px]"
        />
        <div className="flex gap-1.5">
          <button
            type="button"
            onClick={commit}
            className="quest-btn flex-1 px-1 py-1 rounded-lg! text-[8px] sm:text-[10px] font-semibold cursor-pointer"
          >
            OK
          </button>
          <button
            type="button"
            onClick={() => {
              setEditing(false);
              setUrl("");
            }}
            className="group relative px-2 sm:px-3 py-1 text-[8px] sm:text-[10px] rounded-lg transition-all duration-200 hover:scale-105 cursor-pointer"
            style={{ color: "var(--parchment-muted)" }}
          >
            <span className="relative z-10">Cancelar</span>
            <span
              className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              style={{
                background: "rgba(255, 68, 68, 0.1)",
                border: "1px solid rgba(255, 68, 68, 0.3)",
              }}
            />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="aspect-square rounded-lg sm:rounded-xl flex flex-col items-center justify-center cursor-pointer transition-colors"
      style={{
        background: "#131315",
        border: "1px solid #232326",
        color: "#8A8A8F",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#7C6CFF")}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#232326")}
      onClick={() => setEditing(true)}
    >
      <span
        className="text-base sm:text-xl mb-0.5"
        style={{ color: "#7C6CFF" }}
      >
        +
      </span>
      <span className="font-mono text-[7px] sm:text-[9px] tracking-widest uppercase">
        img
      </span>
    </div>
  );
}

function SlideCardCompact({
  slide,
  onOpen,
  onDelete,
}: {
  slide: PortalSlide;
  onOpen: () => void;
  onDelete: () => void;
}) {
  const images = [...(slide.images ?? [])].sort((a, b) => a.order - b.order);

  return (
    <div
      className="group relative aspect-[4/5] rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer transition-shadow duration-300 hover:shadow-[0_0_28px_rgba(124,108,255,0.35)]"
      style={{ background: "#131315", border: "1px solid #232326" }}
      onClick={onOpen}
    >
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        className="absolute top-1.5 sm:top-2 right-1.5 sm:right-2 z-20 flex items-center justify-center h-5 w-5 sm:h-6 sm:w-6 rounded-full text-[8px] sm:text-xs font-bold opacity-0 scale-90 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100 cursor-pointer hover:rotate-90"
        style={{ background: "var(--blood)", color: "#fff" }}
        aria-label="Eliminar slide"
      >
        ✕
      </button>

      <div className="flex flex-col h-full p-2 sm:p-3">
        <span
          className="font-mono text-[8px] sm:text-xs tracking-widest uppercase mb-1.5 sm:mb-2 truncate"
          style={{ color: "var(--parchment)" }}
        >
          {slide.title?.trim() || "Sin título"}
        </span>
        <div className="grid grid-cols-2 grid-rows-2 gap-1 sm:gap-1.5 flex-1">
          {Array.from({ length: 4 }).map((_, i) => {
            const im = images[i];
            return (
              <div
                key={i}
                className="relative rounded-md overflow-hidden"
                style={{ background: "#1a1a1d" }}
              >
                {im && (
                  <img
                    src={im.imageUrl}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div
        className="absolute inset-0 z-10 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: "rgba(10,10,11,0.55)" }}
      >
        <span
          className="font-mono text-[8px] sm:text-xs tracking-widest uppercase"
          style={{ color: "#F2F0EB" }}
        >
          Ver slide
        </span>
      </div>
    </div>
  );
}

/* ---------------- SECCIÓN 4 — PORTAL (narrativa final con modo lectura/edición) ---------------- */
function NarrativeSection({
  narrative,
  setNarrative,
}: {
  narrative: PortalNarrative | null;
  setNarrative: React.Dispatch<React.SetStateAction<PortalNarrative | null>>;
}) {
  const [text, setText] = useState(() => narrative?.text ?? "");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [isEditing, setIsEditing] = useState(!narrative?.text);

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    try {
      const updated = await portalApi.upsertNarrative(text);
      setNarrative(updated);
      setText(updated.text ?? "");
      setSaved(true);
      setIsEditing(false);
      setTimeout(() => setSaved(false), 2000);
    } catch {
      /* ignore */
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setText(narrative?.text ?? "");
    setIsEditing(false);
  };

  return (
    <section className="portal-glow p-2 -m-2">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0 mb-4">
        <h2
          className="font-mono text-sm sm:text-base tracking-[0.2em] uppercase"
          style={{ color: "var(--gold)" }}
        >
          — PORTAL
        </h2>

        <div className="flex flex-wrap items-center justify-end gap-2 w-full sm:w-auto">
          <span
            className="font-mono text-xs px-3 py-1 rounded-full"
            style={{
              background: isEditing
                ? "rgba(255, 200, 50, 0.15)"
                : "rgba(50, 255, 150, 0.15)",
              border: isEditing
                ? "1px solid rgba(255, 200, 50, 0.3)"
                : "1px solid rgba(50, 255, 150, 0.3)",
              color: isEditing ? "#FFC832" : "#32FF96",
            }}
          >
            {isEditing ? "✎ Editando" : "✓ Listo"}
          </span>
        </div>
      </div>

      {isEditing ? (
        <>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Escribí la narrativa final del portal..."
            className="quest-input w-full px-4 py-3 rounded-sm text-sm min-h-48 sm:min-h-64 resize-none overflow-y-auto scrollbar-violet"
            autoFocus
          />

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 mt-3">
            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="quest-btn-retro quest-btn-retro-small cursor-pointer w-full sm:w-auto"
            >
              {saving ? "Guardando..." : "Guardar"}
            </button>

            <button
              type="button"
              onClick={handleCancel}
              className="group relative px-4 py-2 text-sm rounded-xl transition-all duration-300 hover:-translate-y-0.5 cursor-pointer w-full sm:w-auto"
              style={{ color: "var(--parchment-muted)" }}
            >
              <span className="relative z-10">Cancelar</span>
              <span
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300"
                style={{
                  background: "rgba(255, 200, 50, 0.08)",
                  border: "1px solid rgba(255, 200, 50, 0.3)",
                  boxShadow: "0 4px 12px rgba(255, 200, 50, 0.1)",
                }}
              />
            </button>

            {saved && (
              <span className="text-sm" style={{ color: "var(--gold)" }}>
                ✓ Guardado
              </span>
            )}
          </div>
        </>
      ) : (
        <>
          {text ? (
            <div
              className="relative p-4 sm:p-6 rounded-2xl min-h-48 sm:min-h-64"
              style={{
                background: "rgba(255, 255, 255, 0.03)",
                border: "1px solid rgba(255, 255, 255, 0.06)",
              }}
            >
              <div
                className="prose prose-invert max-w-none text-sm leading-relaxed"
                style={{
                  color: "var(--parchment)",
                  fontFamily: "var(--font-body)",
                }}
              >
                {text.split("\n").map((paragraph, index) => (
                  <p key={index} className="mb-4 last:mb-0">
                    {paragraph || "\u00A0"}
                  </p>
                ))}
              </div>

              <div
                className="absolute -top-1 -left-1 w-3 h-3 sm:w-4 sm:h-4"
                style={{
                  borderTop: "2px solid var(--gold-dim)",
                  borderLeft: "2px solid var(--gold-dim)",
                }}
              />
              <div
                className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4"
                style={{
                  borderTop: "2px solid var(--gold-dim)",
                  borderRight: "2px solid var(--gold-dim)",
                }}
              />
              <div
                className="absolute -bottom-1 -left-1 w-3 h-3 sm:w-4 sm:h-4"
                style={{
                  borderBottom: "2px solid var(--gold-dim)",
                  borderLeft: "2px solid var(--gold-dim)",
                }}
              />
              <div
                className="absolute -bottom-1 -right-1 w-3 h-3 sm:w-4 sm:h-4"
                style={{
                  borderBottom: "2px solid var(--gold-dim)",
                  borderRight: "2px solid var(--gold-dim)",
                }}
              />
            </div>
          ) : (
            <div
              className="flex flex-col items-center justify-center p-8 sm:p-12 rounded-2xl min-h-48 sm:min-h-64"
              style={{
                background: "rgba(255, 255, 255, 0.02)",
                border: "2px dashed rgba(255, 255, 255, 0.06)",
              }}
            >
              <span
                className="text-3xl sm:text-4xl mb-3"
                style={{ color: "var(--gold-dim)" }}
              >
                ✦
              </span>
              <p
                className="text-sm text-center"
                style={{ color: "var(--parchment-muted)" }}
              >
                Todavía no hay narrativa escrita
              </p>
              <button
                type="button"
                onClick={handleEdit}
                className="quest-btn-retro quest-btn-retro-small mt-4 cursor-pointer"
              >
                Escribir ahora
              </button>
            </div>
          )}

          {text && (
            <div className="flex items-center gap-3 mt-4">
              <button
                type="button"
                onClick={handleEdit}
                className="quest-btn-retro-secondary quest-btn-retro-small cursor-pointer"
              >
                ✎ Editar
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}

/* ---------------- PORTAL CONTENT ---------------- */
function PortalContent() {
  const [moodBoard, setMoodBoard] = useState<MoodBoardImage[]>([]);
  const [beliefs, setBeliefs] = useState<KeyBelief[]>([]);
  const [slides, setSlides] = useState<PortalSlide[]>([]);
  const [narrative, setNarrative] = useState<PortalNarrative | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const data = await portalApi.getAll();
        if (!active) return;
        setMoodBoard(
          [...(data.moodBoard ?? [])].sort((a, b) => a.order - b.order),
        );
        setBeliefs([...(data.beliefs ?? [])].sort((a, b) => a.order - b.order));
        setSlides([...(data.slides ?? [])].sort((a, b) => a.order - b.order));
        setNarrative(data.narrative ?? null);
      } catch {
        if (active) setError("No se pudo cargar el portal. Intentá de nuevo.");
      } finally {
        if (active) setIsLoading(false);
      }
    };
    load();
    return () => {
      active = false;
    };
  }, []);

  if (isLoading) {
    return (
      <div className="quest-bg min-h-screen">
        <AppHeader />
        <div className="flex items-center justify-center py-32">
          <div
            className="animate-spin h-12 w-12 rounded-full border-4 border-t-transparent"
            style={{
              borderColor: "var(--gold)",
              borderTopColor: "transparent",
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="quest-bg min-h-screen">
      <AppHeader /> {/* 👈 Aquí se usa tu AppHeader con el logout ya integrado para mobile/tablet */}
      <div className="max-w-2xl mx-auto px-3 sm:px-4 py-4 sm:py-8">
        {error && (
          <div
            className="rounded-sm px-4 py-3 text-sm border mb-6"
            style={{
              background: "var(--blood-soft)",
              borderColor: "var(--blood)",
              color: "#f0c9c6",
            }}
          >
            {error}
          </div>
        )}

        {/* Fila 1: Mood Board (ancho completo) */}
        <MoodBoardSection moodBoard={moodBoard} setMoodBoard={setMoodBoard} />

        <div className="quest-divider my-6 sm:my-10" />

        {/* Fila 2: Slides (ancho completo) */}
        <SlidesSection slides={slides} setSlides={setSlides} />

        <div className="quest-divider my-6 sm:my-10" />

        {/* Fila 3: Creencias (ancho completo) */}
        <BeliefsSection beliefs={beliefs} setBeliefs={setBeliefs} />

        <div className="quest-divider my-6 sm:my-10" />

        {/* Fila 4: Portal (ancho completo) */}
        <NarrativeSection narrative={narrative} setNarrative={setNarrative} />
      </div>
    </div>
  );
}

export default function PortalPage() {
  return (
    <AuthGuard>
      <PortalContent />
    </AuthGuard>
  );
}