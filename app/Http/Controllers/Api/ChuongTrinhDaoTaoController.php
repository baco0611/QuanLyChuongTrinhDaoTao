<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ChuongTrinhDaoTaoResource;
use App\Http\Resources\SectionHeaderResource;
use App\Models\ChuongTrinhDaoTao;
use App\Service\ChuongTrinhDaoTaoService;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Response as HttpResponse;

class ChuongTrinhDaoTaoController extends Controller
{
    protected $ctdt;
    public function __construct(ChuongTrinhDaoTao $ctdt) 
    {
        $this->ctdt=$ctdt;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index1()
    {
       $ctdtService = new ChuongTrinhDaoTaoService();
        $listCTDT = $ctdtService->getList();
        return response()->json([
            'mainList'=>$listCTDT
        ], HttpResponse::HTTP_OK);
    }
    public function index2()
    {
        $ctdtService = new ChuongTrinhDaoTaoService();
        $itemHeader =  $ctdtService->getItemFirst();
        $itemResource = SectionHeaderResource::collection($itemHeader);
        return response()->json([
            'id'=>1,
           'data'=> $itemResource
        ], HttpResponse::HTTP_OK);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = $request->all();
        $idChuongTrinh = $request['id'];
        $ctdtService = new ChuongTrinhDaoTaoService();
        $item = $ctdtService->updateCTDT($request);
        $itemResource = ChuongTrinhDaoTaoResource::collection($item);
        return response()->json([
            'id'=>intval($request['id']),
            'data'=> $itemResource
        ], HttpResponse::HTTP_OK);

//     $data = $request->all();
//     $ctdt = new ChuongTrinhDaoTao();
//     $ctdt->fill($data);
//     $ctdt->save();
//     $id = $ctdt->id;
//     return response()->json([
//      'data'=>$id
//  ], HttpResponse::HTTP_OK);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $ctdtService = new ChuongTrinhDaoTaoService();
        $item = $ctdtService->getCTDT($id);
        $itemResource = ChuongTrinhDaoTaoResource::collection($item);
        return response()->json([
            'id'=>intval($id),
            'data'=> $itemResource
        ], HttpResponse::HTTP_OK);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}